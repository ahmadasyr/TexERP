// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName, title, URI } from "./product";
import { Data } from "./product";

const Page: React.FC = () => {
  return (
    <div>
      <EnhancedTable
        title={title}
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={URI}
      />
    </div>
  );
};

export default Page;
