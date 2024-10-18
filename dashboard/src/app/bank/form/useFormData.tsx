import { useState, useEffect } from "react";
import Data, { formFields } from "../bank"; // Adjust path accordingly
import { Alert } from "@mui/material";

export const useFormData = () => {
  const [formData, setFormData] = useState<Data>({
    id: null as any,
    name: null as any,
  });
  const [tableData, setTableData] = useState<any[]>([]);

  const fetchData = async () => {
    const promises = formFields
      .filter((field) => field.relation)
      .map(async (field) => {
        const response = await fetch(
          `http://localhost:3001/api/${field.table}`
        );
        const data = await response.json();
        return { name: field.table, values: data };
      });
    const results = await Promise.all(promises);
    setTableData(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  return {
    formData,
    handleChange,
    tableData,
  };
};
