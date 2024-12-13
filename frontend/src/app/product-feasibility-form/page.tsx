// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./form";
import { Data } from "./form";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Ürün Fizibilite"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/product-feasibility-form"}
      />
    </div>
  );
};

export default Page;
