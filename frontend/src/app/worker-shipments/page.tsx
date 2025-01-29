// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./orderShipment";
import { Data } from "./orderShipment";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Sevk Emirleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        createable={false}
        editable={false}
        deleteable={false}
        URI={"/order-shipment/opened"}
        disableColumnMenu={true}
      />
    </div>
  );
};

export default Page;
