// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./report";
import { Data } from "./report";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Rakip Raporları"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/competitor-report"}
      />
    </div>
  );
};

export default Page;
