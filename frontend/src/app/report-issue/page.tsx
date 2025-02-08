// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./issue";
import { Data } from "./issue";
import { getPersonnelInfo } from "@/contexts/auth";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Sorunlarım"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/report-issue/personnel/" + getPersonnelInfo().id}
      />
    </div>
  );
};

export default Page;
