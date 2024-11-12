// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./complaint";
import { Data } from "./complaint";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Müşteri Şikayetleri"
        headCells={headCells}
        data={Data}
        tableName={tableName}
        viewable={false}
        URI={"/customer-complaint"}
      />
    </div>
  );
};

export default Page;
