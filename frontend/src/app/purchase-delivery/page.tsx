// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./delivery";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Satın Alma Navlunları"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/purchase-delivery"}
      />
    </div>
  );
};

export default Page;
