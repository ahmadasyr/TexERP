// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./plan";
import { Data } from "./plan";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Müşteri Ziyaret Planları"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/customer-meet-plan"}
      />
    </div>
  );
};

export default Page;
