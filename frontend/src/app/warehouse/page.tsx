// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./warehouse";
import { Data } from "./warehouse";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Depolar"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/warehouse"}
      />
    </div>
  );
};

export default Page;
