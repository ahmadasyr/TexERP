// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./order";
import { Data } from "./order";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Satış Siparişleri"
        headCells={headCells}
        tableName={"order"}
        viewable={true}
        URI={"/order"}
      />
    </div>
  );
};

export default Page;
