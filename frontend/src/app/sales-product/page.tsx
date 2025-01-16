// pages/index.tsx
"use client";
import React from "react";
import { Button, Divider, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import {
  columns,
  conditions,
  headCells,
  tableName,
  title,
  URI,
} from "./product";
import { Data } from "./product";
import ExcelTable from "@/components/table/ExcelTable";

const Page: React.FC = () => {
  const [view, setView] = React.useState<string>("list");
  return (
    <div>
      <Tabs value={view} onChange={(e, newValue) => setView(newValue)}>
        <Tab label="Ürün Liste Görünümü" value="list" />
        <Tab label="Fiyat Excel Görünümü" value="excel" />
      </Tabs>
      <Divider />
      {view === "excel" ? (
        <ExcelTable
          columnTypes={columns}
          title={"Ürün Fiyatları"}
          URI={"/product-price"}
        />
      ) : view === "list" ? (
        <EnhancedTable
          tableName={tableName}
          headCells={headCells}
          title={title}
          URI={URI}
          conditions={conditions}
          viewable={true}
        />
      ) : null}
    </div>
  );
};

export default Page;
