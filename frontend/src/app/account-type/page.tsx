// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./type";
import { Data } from "./type";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Hesap Türleri"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/account-type"}
      />
    </div>
  );
};

export default Page;
