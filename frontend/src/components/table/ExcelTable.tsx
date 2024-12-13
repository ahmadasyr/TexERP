"use client";

import React, { useEffect, useRef, useState } from "react";
import { HotTable } from "@handsontable/react";
import { Button, Typography, Divider, Box } from "@mui/material";
import { Add, Refresh, Save } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { fetchExcelRows, reverseMappedRows } from "./utils";
import { getColumnConfig } from "./columnConfig";
import "handsontable/dist/handsontable.full.min.css";
import { fetchData as fetchUtilsData } from "../form/utils";
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
  const hotRef = React.createRef<HotTable>();
  useEffect(() => {
    const hot = (hotRef.current as any)?.hotInstance;

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
      } catch (error) {
        console.error("Error fetching table metadata:", error);
      }
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
    let errorSatus = false;
    try {
      const mergedRows = reverseMappedRows(unsavedChanges, columnTypes);
      const latestRows = mergedRows.reduce((acc, row) => {
        acc[row.id] = row;
        return acc;
      }, {});
      const latestRowsArray = Object.values(latestRows);
      latestRowsArray.forEach(async (row: any) => {
        const id = row.id ? row.id : "";
        const response = await fetch(`/api/${URI}/${id}`, {
          method: row?.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        });
        if (!response.ok) {
          console.error("HTTP error:", response.status);
        }
      });
    } catch (error) {
      errorSatus = true;
      console.error("Error submitting changes:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={1}>
        {title}
      </Typography>
      <Divider />
      <Box display="flex" gap={2} mt={2} mb={2}>
        <Button variant="contained" startIcon={<Add />} onClick={handleAddRow}>
          Satır Ekle
        </Button>
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
          onClick={handleSubmitChanges}
        >
          Değişiklikleri Kaydet
        </Button>
      </Box>
      <HotTable
        data={rows}
        columns={columns}
        ref={hotRef as any}
        licenseKey="non-commercial-and-evaluation"
        afterChange={(changes) => {
          if (changes) {
            const updatedRows = changes.map(([rowIndex, prop, , newValue]) => ({
              ...rows[rowIndex],
              [prop as string]: newValue,
            }));
            setUnsavedChanges((prev) => [...prev, ...updatedRows]);
          }
        }}
        stretchH="all"
        rowHeaders
        width="100%"
        height="400px"
      />
    </Box>
  );
}
