// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/newTableMain";
import { headCells, tableName } from "./orderShipment";
import { Data } from "./orderShipment";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="İplik Sevkiyatları"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/yarn-order-shipment"}
      />
    </div>
  );
};

export default Page;