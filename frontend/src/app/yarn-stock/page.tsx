// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./stock";
import { Data } from "./stock";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="İplik Stok"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/yarn-stock"}
      />
    </div>
  );
};

export default Page;
