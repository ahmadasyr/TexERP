// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./bank";
import { Data } from "./bank";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Banka Listesi"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/bank"}
      />
    </div>
  );
};

export default Page;
