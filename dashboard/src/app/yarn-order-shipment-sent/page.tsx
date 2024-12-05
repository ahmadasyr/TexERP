// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./sent";
import { Data } from "./sent";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Gönderilen İplikler"
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/yarn-order-shipment-sent"}
      />
    </div>
  );
};

export default Page;
