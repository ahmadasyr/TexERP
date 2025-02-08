// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./order";
import { Data } from "./order";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Boyahane Siparişleri"
        headCells={headCells}
        tableName={"dye-order"}
        viewable={true}
        URI={"/dye-order"}
      />
    </div>
  );
};

export default Page;
