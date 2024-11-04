// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./reportSubject";
import { Data } from "./reportSubject";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Rakip Rapor Konuları"
        headCells={headCells}
        data={Data}
        tableName={tableName}
        viewable={false}
        URI={"/competitor-report-subject"}
      />
    </div>
  );
};

export default Page;
