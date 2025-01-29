// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/mobileTable";
import { headCells, tableName } from "./shipmentItem";

const Page: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  return (
    <div>
      <EnhancedTable
        title="Sevk Emir Ürünleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        createable={false}
        editable={false}
        deleteable={false}
        URI={"/order-shipment/items/" + id}
        disableColumnMenu={true}
        viewButtonLabel="Barkod Okut"
      />
    </div>
  );
};

export default Page;
