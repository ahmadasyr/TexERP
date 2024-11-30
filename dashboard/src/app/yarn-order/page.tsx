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
        title="İplik Siparişleri"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/yarn-order/sale/0"}
      />
    </div>
  );
};

export default Page;
