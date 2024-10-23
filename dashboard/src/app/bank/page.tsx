// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { fetchData, headCells, tableName } from "./bank";
import { Data } from "./bank";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Banks"
        fetchData={fetchData}
        headCells={headCells}
        data={Data}
        tableName={tableName}
        viewable={true}
      />
    </div>
  );
};

export default Page;
