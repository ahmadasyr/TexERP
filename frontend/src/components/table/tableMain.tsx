"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import EnhancedTableHead from "../../components/table/tableHead";
import EnhancedTableToolbar from "../../components/table/tableToolBar";
import {
  getComparator,
  handleDelete,
  stableSort,
} from "../../components/table/utils";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import "./table.scss";
import { styled } from "@mui/material/styles";
import { Add, Delete, Edit, Refresh, Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { fetchData } from "../../components/utils";
import {
  DataGrid,
  GridRowId,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridApiRef,
} from "@mui/x-data-grid";
import { trTR } from "../trTrGrid";
type Data = {
  id: number;
};

type EnhancedTableProps = {
  title: string;
  headCells: any[];
  tableName: string;
  viewable?: boolean;
  URI: string;
  customPath?: string;
  useTableName?: boolean;
  conditions?: any;
  createable?: boolean;
  editable?: boolean;
};

export default function EnhancedTable({
  title,
  headCells,
  tableName,
  viewable,
  URI,
  customPath,
  useTableName,
  conditions,
  createable = true,
  editable = true,
}: EnhancedTableProps): JSX.Element {
  const router = useRouter();
  const [rows, setRows] = React.useState<Data[]>([]);
  const [selected, setSelected] = React.useState<readonly GridRowId[]>([]);
  const [refresh, setRefresh] = React.useState(false);
  const [skeleton, setSkeleton] = React.useState(true);
  const [newHeadCells, setNewHeadCells] = React.useState<any[]>([]);

  React.useEffect(() => {
    setSkeleton(true);
    fetchData((data: Data[]) => {
      const processedRows: Data[] = data.map((row: any) => {
        const newRow: any = { id: row.id, ...row };
        headCells.forEach((cell) => {
          if (cell.datetime) {
            const date = row[cell.id]
              ? new Date(row[cell.id]).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "";
            const time = row[cell.id]
              ? new Date(row[cell.id]).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";
            newRow[`${cell.id}_date`] = date;
            newRow[`${cell.id}_time`] = time;
          } else if (cell.date) {
            newRow[cell.id] = row[cell.id]
              ? new Date(row[cell.id]).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "";
          } else if (cell.displayValue && Array.isArray(cell.displayValue)) {
            newRow[cell.id] = row[cell.id];
          }
        });
        return newRow;
      });

      setRows(processedRows);
    }, URI);
  }, [URI, refresh]);

  // condition example:
  // conditions = [
  //   {
  //     action: ["edit"],
  //     checks: [
  //       {
  //         key: "fromPersonnelId",
  //         type: "equal",
  //         value: getPersonnelInfo().id,
  //       },
  //       {
  //         key: "toPersonnelId",
  //         type: "equal",
  //         value: getPersonnelInfo().id,
  //       },
  //       {
  //         key: "followedPersonnelId",
  //         type: "equal",
  //         value: getPersonnelInfo().id,
  //       },
  //     ],
  //   },
  //   {
  //     action: ["delete"],
  //     checks: [
  //       {
  //         key: "fromPersonnelId",
  //         type: "equal",
  //         value: getPersonnelInfo().id,
  //       },
  //     ],
  //   },
  // ];

  const checkConditions = (row: any, action: string) => {
    let result = true;
    conditions?.forEach((condition: any) => {
      if (condition.action.includes(action)) {
        let check = false;
        condition.checks.forEach((checkCondition: any) => {
          if (checkCondition.type === "equal") {
            check =
              check || row[checkCondition.key] === checkCondition.value
                ? true
                : false;
          }
        });
        result = check;
      }
    });
    return result;
  };

  React.useEffect(() => {
    // Fetch data and preprocess rows

    const newHeadCell = headCells.flatMap((cell) => {
      if (cell.datetime) {
        return [
          {
            field: `${cell.id}_date`,
            headerName: `${cell.label} - Tarih`,
            width: cell.width || 130,
            hide: !cell.visible,
            type: "date",
            valueGetter: (params: any, row: any) => {
              return row[cell.id] ? new Date(row[cell.id]) : null;
            },
          },
          {
            field: `${cell.id}_time`,
            headerName: `${cell.label} - Saat`,
            width: cell.width || 130,
            hide: !cell.visible,
            type: "string",
          },
        ];
      }
      if (cell.actionConditions) {
        return {
          field: cell.id + "_actions",
          headerName: cell.label,
          width: cell.width || 130,
          hide: !cell.visible,
          type: cell.numeric ? "number" : "string",
          valueGetter: (params: any, row: any) => {
            if (typeof row === "object" && cell.displayValue) {
              return `${row[cell.id]?.id} - ${cell.displayValue
                .map((key: string) => row[cell.id]?.[key])
                .join(" ")}`;
            } else if (cell.boolean) {
              return Boolean(row[cell.id]) ? "Evet" : "Hayır";
            } else {
              return row[cell.id];
            }
          },

          renderCell: (params: any) => {
            const render = cell.actionConditions.find(
              (condition: any) => condition.value === params.value
            );
            return (
              <Button
                onClick={async () => {
                  if (render.action) {
                    await fetch(`${render.action}/${params.row.id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    setRefresh(!refresh);
                  }
                }}
                variant="contained"
                color={render?.color || "primary"}
              >
                {render?.label || "İşlem Bulunamadı"}
              </Button>
            );
          },
        };
      }
      return {
        field: cell.id,
        headerName: cell.label,
        width: cell.width || 130,
        hide: !cell.visible,
        type: cell.numeric ? "number" : "string",
        valueGetter: (params: any, row: any) => {
          if (typeof row === "object" && cell.displayValue) {
            return `${row[cell.id]?.id} - ${cell.displayValue
              .map((key: string) => row[cell.id]?.[key])
              .join(" ")}`;
          } else {
            return row[cell.id];
          }
        },

        renderCell: (params: any) => {
          const value = params.value;
          if (cell.boolean) {
            // Render a Checkbox for boolean values
            return (
              // <Checkbox
              //   checked={Boolean(value)} // Ensures proper boolean type
              //   style={{
              //     textDecoration: "none",
              //     cursor: "default",
              //   }}
              //   inputProps={{ "aria-label": "boolean value" }}
              // />
              Boolean(value) ? "Evet" : "Hayır"
            );
          }
          if (cell.clickable && cell.displayValue) {
            return (
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  router.push(`${cell.uri}${value.split(" - ")[0]}`);
                }}
              >
                {
                  // example value "3 - Customer Name"
                  // display only "Customer Name"
                  value.split(" - ")[1]
                }
              </span>
            );
          }
          if (cell.clickable && !cell.displayValue) {
            return (
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  router.push(`${cell.uri}${value}`);
                }}
              >
                {value}
              </span>
            );
          }
          if (cell.displayValue && value !== null) {
            return value.split(" - ")[1];
          } else return value;
        },
      };
    });
    setNewHeadCells([
      ...newHeadCell,
      {
        field: "actions",
        headerName: "İşlemler",
        width: 150,
        hidable: false,
        sortable: false,

        renderCell: (params: any) => {
          return (
            <div>
              {viewable && (
                <IconButton
                  onClick={() => {
                    if (conditions) {
                      if (checkConditions(params.row, "view")) {
                        router.push(
                          `${useTableName ? tableName : currentURI}/view/?id=${
                            params.row.id
                          }`
                        );
                      } else {
                        setResult({
                          code: 401,
                        });
                      }
                    } else {
                      router.push(
                        `${useTableName ? tableName : currentURI}/view/?id=${
                          params.row.id
                        }`
                      );
                    }
                  }}
                >
                  <Visibility />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  if (conditions) {
                    if (checkConditions(params.row, "edit")) {
                      router.push(
                        `${useTableName ? tableName : currentURI}/form/?id=${
                          params.row.id
                        }`
                      );
                    } else {
                      setResult({
                        code: 401,
                      });
                    }
                  } else {
                    router.push(
                      `${useTableName ? tableName : currentURI}/form/?id=${
                        params.row.id
                      }`
                    );
                  }
                }}
              >
                <Edit />
              </IconButton>
            </div>
          );
        },
      },
    ]);
    setSkeleton(false);
  }, [URI, headCells, rows]);
  const currentURI = window.location.pathname;

  const handleClose = () => {
    setDeleteDialog(false);
  };
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [selections, setSelections] = React.useState<number[]>([]);
  const [result, setResult] = React.useState<any>({});
  function CustomToolbar() {
    return (
      <>
        <GridToolbarContainer>
          <Grid item xs={12}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
              csvOptions={{
                fileName: `${title}-${new Date().toLocaleDateString()}`,
              }}
              printOptions={{
                hideFooter: true,
                hideToolbar: true,
              }}
            />
          </Grid>
          <GridToolbarQuickFilter />

          <Button
            style={{ marginLeft: "auto" }}
            variant="contained"
            onClick={() => {
              if (conditions) {
                if (checkConditions({}, "create")) {
                  router.push(`${useTableName ? tableName : currentURI}/form`);
                } else {
                  setResult({
                    code: 401,
                  });
                }
              } else if (!createable) {
                setResult({
                  code: 401,
                });
              } else {
                router.push(`${useTableName ? tableName : currentURI}/form`);
              }
            }}
          >
            Yeni Oluştur
            <Add />
          </Button>

          {selected.length === 0 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setRefresh(!refresh);
              }}
            >
              Yenile
              <Refresh />
            </Button>
          )}
          {selected.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                const newSelections: number[] = [];
                if (conditions) {
                  selected.forEach((id) => {
                    if (
                      checkConditions(
                        rows.find((row) => row.id === id),
                        "delete"
                      )
                    ) {
                      newSelections.push(id as number);
                    } else {
                      setResult({
                        code: 401,
                      });
                    }
                  });
                } else {
                  newSelections.push(...selected.map((id) => id as number));
                }
                if (newSelections.length > 0) {
                  setSelections(newSelections);
                  setDeleteDialog(true);
                } else {
                  setResult({
                    code: 401,
                  });
                }
              }}
            >
              <Delete />
            </Button>
          )}
          {selected.length === 1 && (
            <>
              {viewable && (
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => {
                    if (conditions) {
                      if (
                        checkConditions(
                          rows.find((row) => row.id === selected[0]),
                          "view"
                        )
                      ) {
                        router.push(
                          `${useTableName ? tableName : currentURI}/view/?id=${
                            selected[0]
                          }`
                        );
                      }
                    } else {
                      router.push(
                        `${useTableName ? tableName : currentURI}/view/?id=${
                          selected[0]
                        }`
                      );
                    }
                  }}
                >
                  <Visibility />
                </Button>
              )}
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  if (conditions) {
                    if (
                      checkConditions(
                        rows.find((row) => row.id === selected[0]),
                        "edit"
                      )
                    ) {
                      router.push(
                        `${useTableName ? tableName : currentURI}/form/?id=${
                          selected[0]
                        }`
                      );
                    } else {
                      setResult({
                        code: 401,
                      });
                    }
                  } else {
                    router.push(
                      `${useTableName ? tableName : currentURI}/form/?id=${
                        selected[0]
                      }`
                    );
                  }
                }}
              >
                <Edit />
              </Button>
            </>
          )}
        </GridToolbarContainer>
      </>
    );
  }
  const [resultDialog, setResultDialog] = React.useState(false);
  useEffect(() => {
    if (result.code) {
      setResultDialog(true);
    }
  }, [result]);
  return (
    <>
      <Dialog open={deleteDialog} onClose={handleClose}>
        <DialogTitle>Veriyi Sil</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <p>
              Seçilen {title.toLocaleLowerCase()} silmek istediğinize emin
              misiniz?
            </p>
            <div>
              <strong>No:</strong>{" "}
              {selections.map((id, index) => (
                <React.Fragment key={id}>
                  {id}
                  {index < selections.length - 1 && ", "}
                </React.Fragment>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button
            onClick={async () => {
              const result = await handleDelete(tableName, selections);
              setResult(result);
              setDeleteDialog(false);
              setRefresh(!refresh);
            }}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resultDialog} onClose={() => setResult({})}>
        <DialogTitle>
          {result.code === 200
            ? "Başarılı"
            : result.code === 500
            ? "Hata"
            : "Başarısız"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {result.code === 200
              ? "Silme işlemi başarılı"
              : result.code === 500
              ? "Silme işlemi başarısız"
              : result.code === 401
              ? "Bu işlemi gerçekleştirmek için yetkiniz yok"
              : "Silme işlemi kısmen başarısız"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResultDialog(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
      <Box
        style={{
          maxWidth: "130%",
          minWidth: "90%",
        }}
        className="enhanced-table"
      >
        <Paper className="table-paper">
          <Typography fontWeight={500} mb={1} variant="h5" component="h5">
            {title}
          </Typography>
          <Divider />
          <br />
          <DataGrid
            ignoreDiacritics={true}
            loading={skeleton}
            {...rows}
            rows={rows}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            // when rows are empty, no rows
            pageSizeOptions={[25, 50, 100]}
            disableColumnSorting={false}
            columns={newHeadCells}
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
            slots={{ toolbar: CustomToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },

              sorting: {
                sortModel: [
                  {
                    field: "id",
                    sort: "desc",
                  },
                ],
              },
            }}
            // add row selection and deletion
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelection) => {
              setSelected(newSelection);
            }}
            // scroll overflow
            style={{
              height: "40rem",
              width: "100%",
            }}
          />
        </Paper>
      </Box>
    </>
  );
}
