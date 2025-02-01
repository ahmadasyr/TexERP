// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import { Button, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./stock";
import { Data } from "./stock";
import { itemTypes } from "@/contexts/itemTypes";
import { Print } from "@mui/icons-material";
import PrintLabels from "./printLabels";

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ids, setIds] = React.useState<number[]>([]);
  const [open, setOpen] = React.useState(false);
  const status = searchParams.get("status");
  return (
    <div>
      <PrintLabels
        ids={ids}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Select
        onChange={(e) => router.push("/stock?status=" + e.target.value)}
        defaultValue=""
        value={status || ""}
      >
        <MenuItem value="" disabled>
          Select stock status
        </MenuItem>
        {itemTypes.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {status ? (
        <EnhancedTable
          title={
            itemTypes.find((item) => item.value === status)?.label + " Stok" ||
            ""
          }
          headCells={headCells}
          tableName={tableName}
          viewable={false}
          URI={"/stock/status/" + status}
          specialButton={[
            {
              color: "secondary",
              label: "Etiket Bas",
              action: (data: any) => {
                setOpen(true);
                setIds(data);
              },
            },
          ]}
        />
      ) : (
        <Paper sx={{ padding: 2, m: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Stok durumu seçiniz
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default Page;
