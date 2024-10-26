// pages/index.tsx
"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "../customer";
import { Data } from "../customer";

const Page: React.FC = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        {/* <EnhancedTable
          title="Şikaetler"
          headCells={headCells}
          data={Data}
          tableName={tableName}
          viewable={true}
          URI={"/customer-complaint/customer/:id=" + id}
        /> */}
      </Box>
    </div>
  );
};

export default Page;
