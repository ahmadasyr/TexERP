// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./customer";
import { Data } from "./customer";

const Page: React.FC = () => {
  return (
    <div>
      <EnhancedTable
        title="Customers"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/customer"}
      />
    </div>
  );
};

export default Page;
