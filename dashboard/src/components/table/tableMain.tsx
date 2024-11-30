"use client";
import React, { use, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import EnhancedTableHead from "../../components/table/tableHead";
import EnhancedTableToolbar from "../../components/table/tableToolBar";
import { getComparator, stableSort } from "../../components/table/utils";
import { Button, IconButton, Link, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import "./table.scss";
import { styled } from "@mui/material/styles";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { fetchData } from "../../components/utils";
type Data = {
  id: number;
};

type EnhancedTableProps = {
  title: string;
  headCells: any[];
  tableName: string;
  viewable?: boolean;
  URI: string;
};

export default function EnhancedTable({
  title,
  headCells,
  tableName,
  viewable,
  URI,
}: EnhancedTableProps): JSX.Element {
  const router = useRouter();
  const [rows, setRows] = React.useState<Data[]>([]);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [refresh, setRefresh] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  React.useEffect(() => {
    fetchData(setRows, URI);
  }, [URI]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:nth-of-type(even):hover": {
      backgroundColor: theme.palette.action.selected,
    },
    "&:nth-of-type(odd):hover": {
      backgroundColor: theme.palette.action.selected,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;
  const [visibleColumns, setVisibleColumns] = React.useState(
    headCells.map((column) => ({ ...column, visible: true }))
  );
  useEffect(() => {
    setVisibleColumns(
      headCells.map((column) => ({
        ...column,
        visible: true,
      }))
    );
  }, [headCells]);
  return (
    <Box
      style={{
        maxWidth: "100%",
        minWidth: "90%",
      }}
      className="enhanced-table"
    >
      <Paper className="table-paper">
        <EnhancedTableToolbar
          URI={tableName}
          title={title}
          tableName={tableName}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          refresh={refresh}
          setRefresh={setRefresh}
          searchTerm={searchTerm} // Pass search term state
          setSearchTerm={setSearchTerm} // Pass setSearchTerm function
          visibleColumns={visibleColumns} // Pass headCells
          setVisibleColumns={setVisibleColumns} // Pass setRows function
          headCells={headCells} // Pass headCells
        />
        <TableContainer>
          <Table stickyHeader>
            <EnhancedTableHead
              headCells={visibleColumns}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy as string}
              onSelectAllClick={(e) => handleSelectAllClick(e)}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy)) // Use filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = selected.indexOf(row.id) !== -1;
                  return (
                    <StyledTableRow
                      hover
                      onDoubleClick={() => {
                        viewable
                          ? router.push(`/${tableName}/form/?id=${row.id}`)
                          : null;
                      }}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      className={`table-row ${
                        isItemSelected ? "selected" : ""
                      }`}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={() => handleClick(row.id)}
                        />
                      </TableCell>
                      {visibleColumns.map((headCell) =>
                        headCell?.visible ? (
                          <TableCell
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            key={headCell.id}
                          >
                            {typeof row[headCell.id as keyof Data] ===
                            "boolean" ? (
                              row[headCell.id as keyof Data] ? (
                                "Evet"
                              ) : (
                                "Hayır"
                              )
                            ) : typeof row[headCell.id as keyof Data] ===
                                "object" &&
                              (row[headCell.id as keyof Data] as any)?.id ? (
                              <Link
                                href={`/${headCell.id}/form/?id=${
                                  (row[headCell.id as keyof Data] as any)?.id
                                }`}
                              >
                                {headCell.displayValue.map(
                                  (value: keyof Data) =>
                                    (row[headCell.id as keyof Data] as any)[
                                      value
                                    ] + " "
                                )}
                              </Link>
                            ) : typeof row[headCell.id as keyof Data] ===
                              "object" ? (
                              row[headCell.id as keyof Data]?.toString()
                            ) : headCell.date ? (
                              new Date(
                                row[headCell.id as keyof Data]
                              ).toLocaleDateString()
                            ) : (
                              row[headCell.id as keyof Data]
                            )}
                          </TableCell>
                        ) : null
                      )}
                      {viewable ? (
                        <TableCell
                          width={"1rem"}
                          key="view"
                          padding="none"
                          size="small"
                          // always visible
                        >
                          <IconButton
                            onClick={() =>
                              router.push(`/${tableName}/view/?id=${row.id}`)
                            }
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      ) : null}
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length} // Use filteredRows length
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
