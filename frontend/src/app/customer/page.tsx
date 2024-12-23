// pages/index.tsx
"use client";
import React from "react";
import { Button, Divider, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName, columns } from "./customer";
import { useFormData } from "@/components/form/utils";
import { Data } from "./customer";
import ExcelTable from "@/components/table/ExcelTable";
const Page: React.FC = () => {
  const [view, setView] = React.useState<string>("list");
  return (
    <div>
      <Tabs value={view} onChange={(e, newValue) => setView(newValue)}>
        <Tab label="Liste Görünümü" value="list" />
        <Tab label="Excel Görünümü" value="excel" />
      </Tabs>
      <Divider />
      {view === "excel" ? (
        <ExcelTable
          columnTypes={columns}
          title="Müşteri Listesi"
          URI="customer"
        />
      ) : view === "list" ? (
        <EnhancedTable
          title="Müşteri Listesi"
          headCells={headCells}
          tableName={tableName}
          viewable={true}
          URI={"/customer"}
        />
      ) : null}
    </div>
  );
};

export default Page;
