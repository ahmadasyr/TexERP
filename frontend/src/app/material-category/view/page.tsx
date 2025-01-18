// pages/index.tsx
"use client";
import React, { useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import EnhancedTable from "@/components/table/tableMain";
import { headCells, tableName } from "@/app/material/material";
import { Data } from "../material";

const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [category, setCategory] = React.useState<Data | null>({
    id: 0,
    name: "",
  });
  useEffect(() => {
    if (id) {
      fetch(`/api/material-category/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCategory(data);
        });
    }
  }, [id]);
  return (
    <div>
      <EnhancedTable
        title={category?.name + " Malzemeleri"}
        headCells={headCells}
        tableName={tableName}
        viewable={false}
        URI={"/material/category/" + id}
        customPath={"/material/form/?categoryId=" + id}
      />
    </div>
  );
};

export default Page;
