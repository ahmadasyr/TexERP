import { useState, useEffect } from "react";
export const createField = ({
  name = "",
  label = "",
  type = "",
  required = false,
  relation = false,
  table = "",
  value = "",
  displayValue = null as string[] | string | null,
  options = [] as string[],
  dependant = false,
  dependency = "",
  multiOptions = [] as { value: string; options: string[] }[],
}) => ({
  name,
  label,
  type,
  required,
  relation,
  table,
  value,
  displayValue,
  options,
  dependant,
  dependency,
  multiOptions,
});

export const fetchData = async (
  formFields: any[],
  setTableData: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
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
    console.log("Results:", results);
    setTableData(results);
  } catch (error) {
    console.error("Error fetching table data:", error);
  }
};

export const useFormData = <Data,>(formFields: any[]) => {
  const initializeFormData = <T extends {}>(): T => {
    const formData: Partial<Record<keyof T, null>> = {};
    Object.keys(formData).forEach((key) => {
      formData[key as keyof T] = null;
    });
    return formData as T;
  };

  const [formData, setFormData] = useState<Data>(initializeFormData());
  const [tableData, setTableData] = useState<any[]>([]);

  // Only fetch data once on mount
  useEffect(() => {
    fetchData(formFields, setTableData);
  }, [formFields]);

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
