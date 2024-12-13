// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./competitor";
import { Data } from "./competitor";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Rakipler"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/competitor"}
      />
    </div>
  );
};

export default Page;
