// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./material";
import { Data } from "./material";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Malzemeler"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/material"}
      />
    </div>
  );
};

export default Page;
