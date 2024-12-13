// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./yarnType";
import { Data } from "./yarnType";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="İplik Türleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/yarn-type"}
      />
    </div>
  );
};

export default Page;
