// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./taxOffice";
import { Data } from "./taxOffice";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Vergi Daireleri"
        headCells={headCells}
        data={Data}
        tableName={tableName}
        viewable={true}
        URI={"/tax-office"}
      />
    </div>
  );
};

export default Page;
