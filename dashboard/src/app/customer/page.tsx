// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { fetchData, headCells, tableName } from "./customer";
import { Data } from "./customer";

const Page: React.FC = () => {
  return (
    <div>
      <EnhancedTable
        title="Customers"
        fetchData={fetchData}
        headCells={headCells}
        data={Data}
        tableName={tableName}
        viewable={true}
      />
    </div>
  );
};

export default Page;
