// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./item";
import { Data } from "./item";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Ürün Tipi"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/item-type"}
      />
    </div>
  );
};

export default Page;
