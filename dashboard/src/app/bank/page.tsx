// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { fetchData, headCells, Data, tableName } from "./bank";

const Customer: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      {/* Chenge */}
      <h1>Banks</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/bank/form")}
      >
        Create New
      </Button>
      <EnhancedTable
        fetchData={fetchData}
        headCells={headCells}
        data={Data}
        tableName={tableName}
      />
    </div>
  );
};

export default Customer;
