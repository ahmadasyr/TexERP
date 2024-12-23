// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./lamination";
import { Data } from "./lamination";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Lamine Rengi Listesi"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/lamination-color"}
      />
    </div>
  );
};

export default Page;
