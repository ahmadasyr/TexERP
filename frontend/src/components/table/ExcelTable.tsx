"use client";

import React, { useEffect, useRef, useState } from "react";
import { HotTable } from "@handsontable/react";
import {
  Button,
  Typography,
  Divider,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { Add, Refresh, Save } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { fetchExcelRows, reverseMappedRows } from "./utils";
import { getColumnConfig } from "./columnConfig";
import "handsontable/dist/handsontable.full.min.css";
import { fetchData as fetchUtilsData } from "../form/utils";
import { registerAllModules } from "handsontable/registry";

registerAllModules();

type EnhancedTableProps = {
  title: string;
  URI: string;
  columnTypes: any[];
};

export default function HandsontableEnhanced({
  title,
  columnTypes,
  URI,
}: EnhancedTableProps): JSX.Element {
  const [initialRows, setInitialRows] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState<any[]>([]);
  const [errorRows, setErrorRows] = useState<any[]>([]);
  const hotRef = React.createRef<HotTable>();
  const hot = (hotRef.current as unknown as { hotInstance: any })?.hotInstance;

  useEffect(() => {
    hot?.validateCells();
  });

  const router = useRouter();

  useEffect(() => {
    fetchExcelRows(URI, columnTypes, setRows, setInitialRows);
  }, [URI, refresh]);

  useEffect(() => {
    const loadTableData = async () => {
      try {
        await fetchUtilsData(columnTypes, setTableData);
      } catch (error) {}
    };
    loadTableData();
  }, [columnTypes]);

  useEffect(() => {
    if (tableData.length > 0) {
      setColumns(getColumnConfig(columnTypes, tableData));
    }
  }, [tableData, columnTypes]);

  const handleAddRow = () => {
    setRows((prev) => [...prev, { id: Date.now() }]);
  };

  const handleSubmitChanges = async () => {
    let errorStatus = false;
    const hot = hotRef.current
      ? (hotRef.current as any).hotInstance
      : undefined;

    if (!hot) {
      return;
    }

    try {
      // Assuming reverseMappedRows returns an object of rows
      const mergedRows = reverseMappedRows(hot.getData(), columnTypes);

      // Remove the last 10 rows
      const latestRows = Object.values(mergedRows).slice(0, -10);
      console.log("Latest Rows:", latestRows);

      // Validate initialRows
      if (!Array.isArray(initialRows)) {
        return;
      }

      // Filter rows that have been changed
      const changedRows = latestRows.filter((row) => {
        if (!row) {
          return false;
        }

        const initialRow = initialRows.find((r) => r?.id === row?.id);
        if (!initialRow) {
          console.warn(`No matching initial row found for id: ${row?.id}`);
          return true; // Treat this as a change if no initial match
        }

        // Helper function to normalize values
        const normalizeValue = (_key: string, value: any) => {
          if (value instanceof Date) {
            return value.getTime(); // Convert Date object to timestamp
          } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
            return new Date(value).getTime(); // Convert date strings to timestamp
          }
          return value; // Return as-is for non-dates
        };

        // Compare values based only on keys in the latest row
        return Object.keys(row).some((key) => {
          const latestValue = normalizeValue(key, row[key]);
          const initialValue = normalizeValue(key, initialRow[key]);
          return latestValue !== initialValue;
        });
      });

      console.log("Changed Rows:", changedRows);
      console.log("Initial Rows:", initialRows);

      // Process changed rows
      const requests = changedRows.map(async (row: any, index) => {
        if (!row) {
          return;
        }

        const { id, ...rest } = row;
        try {
          const response = await fetch(`/api/${URI}/${id ? id : ""}`, {
            method: id ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rest),
          });
          console.log("Response:", response);
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
        } catch (error) {
          setErrorRows((prev) => [...prev, id || index]);
          errorStatus = true;
        }
      });

      // Wait for all requests to complete
      await Promise.all(requests);
    } catch (error) {
      errorStatus = true;
    }

    if (!errorStatus) {
      setUnsavedChanges([]);
      setRefresh((prev) => !prev);
      handleClose();
    }
  };

  const [submit, setSubmit] = useState(false);
  const handleClose = () => {
    setSubmit(false);
  };
  return (
    <>
      {/* pop up alert */}
      {unsavedChanges.length > 0 && (
        <Box mt={2} color="blue">
          <Typography variant="body2" color="primary">
            <strong>Bilgi:</strong> Kaydedilmemiş değişiklikleriniz var.
          </Typography>
        </Box>
      )}

      <Dialog
        open={submit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Kaydet"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Kaydetmek istediğinizden emin misiniz?
          </DialogContentText>
          <Box display="flex" justifyContent="center">
            {unsavedChanges.map((row) => {
              if (row.id) {
                return (
                  <Typography key={row.id} variant="body2">
                    {row.id}
                  </Typography>
                );
              }
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hayır
          </Button>
          <Button onClick={handleSubmitChanges} color="primary" autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>

      <Box>
        <Box m={2}>
          <Paper
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            <Typography fontWeight={500} mb={1} variant="h5" component="h5">
              {title}
            </Typography>
            <Divider />
            <Box display="flex" gap={2} m={2}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Refresh />}
                onClick={() => setRefresh((prev) => !prev)}
              >
                Yenile
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={() => setSubmit(true)}
              >
                Değişiklikleri Kaydet
              </Button>
            </Box>

            {errorRows.length > 0 && (
              <Box mt={2} color="red">
                <Typography variant="body2" color="error">
                  <strong>Error:</strong> The following rows failed to update:
                </Typography>
                <ul>
                  {errorRows.map((rowId) => (
                    <li key={rowId}>Row ID: {rowId}</li>
                  ))}
                </ul>
              </Box>
            )}

            <HotTable
              data={rows}
              columns={columns}
              ref={hotRef as any}
              minSpareRows={10}
              contextMenu={true}
              licenseKey="non-commercial-and-evaluation"
              afterChange={(changes) => {
                if (changes) {
                  const updatedRows = changes.map(
                    ([rowIndex, prop, , newValue]) => ({
                      ...rows[rowIndex],
                      [prop as string]: newValue,
                    })
                  );
                  setUnsavedChanges((prev) => [...prev, ...updatedRows]);
                }
              }}
              stretchH="all"
              rowHeaders
              width="100%"
              height="40rem"
              fixedColumnsStart={2}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
