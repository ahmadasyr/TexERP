// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./group";
import { Data } from "./group";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Fason Kategrorileri"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/outsource-group"}
      />
    </div>
  );
};

export default Page;
