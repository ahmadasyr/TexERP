// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./price";
import { Data } from "./price";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Müşteri Fiyatları"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/customer-price"}
      />
    </div>
  );
};

export default Page;
