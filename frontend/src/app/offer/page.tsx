// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./offer";
import { Data } from "./offer";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Teklifler"
        headCells={headCells}
        tableName={tableName}
        // viewable={false}
        URI={"/offer"}
      />
    </div>
  );
};

export default Page;
