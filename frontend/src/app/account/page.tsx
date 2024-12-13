// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./account";
import { Data } from "./account";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Hesaplar"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/account"}
      />
    </div>
  );
};

export default Page;
