// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./dof";
import { Data } from "./dof";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="DÖF Listesi"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/dof"}
      />
    </div>
  );
};

export default Page;
