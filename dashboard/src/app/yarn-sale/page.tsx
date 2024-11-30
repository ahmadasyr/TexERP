// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./yarnOrder";
import { Data } from "./yarnOrder";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="İplik Satışları"
        headCells={headCells}
        tableName={"/yarn-sale"}
        viewable={false}
        URI={"/yarn-order/sale/1"}
      />
    </div>
  );
};

export default Page;
