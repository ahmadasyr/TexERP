// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { fetchData, headCells, Data } from "./customer";

const Customer: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <h1>User Management</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/customer/form")}
      >
        Create New
      </Button>
      <EnhancedTable fetchData={fetchData} headCells={headCells} data={Data} />
    </div>
  );
};

export default Customer;
