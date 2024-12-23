// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./dye";
import { Data } from "./dye";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Boya Rengi Listesi"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/dye-color"}
      />
    </div>
  );
};

export default Page;
