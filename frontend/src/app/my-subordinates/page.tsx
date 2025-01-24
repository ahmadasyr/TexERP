// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { conds, headCells, tableName } from "./personnel";
import { Data } from "./personnel";
import { getPersonnelInfo } from "@/contexts/auth";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Benim Alt Çalışanlarım"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        createable={false}
        editable={false}
        conditions={conds}
        URI={"/personnel/subordinates/" + getPersonnelInfo()?.id}
      />
    </div>
  );
};

export default Page;
