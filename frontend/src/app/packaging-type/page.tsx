// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./packaging";
import { Data } from "./packaging";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Ambalaj Türü Listesi"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/packaging-type"}
      />
    </div>
  );
};

export default Page;
