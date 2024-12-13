// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import ExcelTable from "@/components/table/ExcelTable";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName, formFields, columns } from "./plan";
import { useFormData } from "@/components/form/utils";
import { Data } from "./plan";
import Calendar from "./calendar/page";
const Page: React.FC = () => {
  const router = useRouter();
  const [view, setView] = React.useState<string>("list");
  return (
    <div>
      <Tabs value={view} onChange={(e, newValue) => setView(newValue)}>
        <Tab label="Liste Görünümü" value="list" />
        <Tab label="Takvim Görünümü" value="calendar" />
        <Tab label="Excel Görünümü" value="excel" />
      </Tabs>
      <Divider />
      {view === "excel" ? (
        <ExcelTable
          columnTypes={columns}
          title="Müşteri Ziyaret Planı"
          URI="customer-meet-plan"
        />
      ) : view === "calendar" ? (
        <Calendar />
      ) : view === "list" ? (
        <EnhancedTable
          tableName={tableName}
          headCells={headCells}
          title="Müşteri Ziyaret Planı"
          URI="/customer-meet-plan"
        />
      ) : null}
    </div>
  );
};

export default Page;
