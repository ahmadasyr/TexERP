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
        title="Boyahane İrsaliyeleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/dye-shipment"}
      />
    </div>
  );
};

export default Page;
