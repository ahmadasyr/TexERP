// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./order";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Satın Alma Siparişleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/purchase-order"}
      />
    </div>
  );
};

export default Page;
