// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./report";
import { Data } from "./report";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Müşteri Görüşme Raporları"
        headCells={headCells}
        data={Data}
        tableName={tableName}
        viewable={true}
        URI={"/customer-meet-report"}
      />
    </div>
  );
};

export default Page;
