// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { conditions, headCells, tableName } from "./request";
import { Data } from "./request";
import { getPersonnelInfo } from "@/contexts/auth";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Satın Alma Talepleri"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/purchase-request/supervisor-approved/"}
        createable={false}
        conditions={conditions}
      />
    </div>
  );
};

export default Page;
