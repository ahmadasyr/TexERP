// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/listView";
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
  const [searchKey, setSearchKey] = React.useState<string>("");
  return (
    <div>
      <PrintLabels
        ids={ids}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Paper sx={{ padding: 2, m: "auto", margin: 2 }}>
        <Typography variant="h6" gutterBottom>
          Stok Tipi Seçiniz
        </Typography>
        <Select
          onChange={(e) =>
            router.push("/worker-stock/?status=" + e.target.value)
          }
          defaultValue=""
          value={status || ""}
          fullWidth
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          <MenuItem value="" disabled>
            Stok Tipi Seçiniz
          </MenuItem>
          {itemTypes.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>{" "}
        <TextField
          id="outlined-basic"
          label="Kelime ile ara"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </Paper>
      {status ? (
        <EnhancedTable
          title={undefined}
          headCells={headCells}
          tableName={tableName}
          viewable={false}
          editable={false}
          URI={"/stock/status/" + status}
          searchKey={searchKey}
          cellCount={3}
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
