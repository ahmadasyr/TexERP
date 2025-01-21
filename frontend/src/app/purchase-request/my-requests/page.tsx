// pages/index.tsx
"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "./request";
import { Data } from "./request";
import { getPersonnelInfo } from "@/contexts/auth";
import { conditions } from "./request";

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <EnhancedTable
        title="Satın Alma Taleplerim"
        headCells={headCells}
        tableName={tableName}
        viewable={true}
        URI={"/purchase-request/personnel/" + getPersonnelInfo().id}
        conditions={conditions}
      />
    </div>
  );
};

export default Page;
