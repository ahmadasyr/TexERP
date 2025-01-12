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
        title="Fason İşlemleri"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/outsource-type"}
      />
    </div>
  );
};

export default Page;
