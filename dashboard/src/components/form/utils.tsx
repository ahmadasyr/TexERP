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
  options = [] as any[],
  dependant = false,
  dependency = "",
  multiOptions = [] as { value: string; options: string[] }[],
  creatable = true,
  disabled = false,
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
  creatable,
  disabled,
});

export const fetchData = async (
  formFields: any[],
  setTableData: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const promises = formFields
      .filter((field) => field.relation)
      .map(async (field) => {
        const response = await fetch(`/api/${field.table}`);
        const data = await response.json();
        return { name: field.table, values: Array.isArray(data) ? data : [] };
      });
    const results = await Promise.all(promises);
    setTableData(results);
  } catch (error) {
    setTableData([]);
    console.error("Error fetching table data:", error);
  }
};

export const useFormData = <Data extends {}>(formFields: any[]) => {
  const initializeFormData = <T extends {}>(fields: any[]): T => {
    const formData: Partial<Record<keyof T, null>> = {};
    fields.forEach((field) => {
      formData[field.name as keyof T] = null;
    });
    return formData as T;
  };

  const [formData, setFormData] = useState<Data>(
    initializeFormData<Data>(formFields)
  );
  const [tableData, setTableData] = useState<any[]>([]);

  const runFetchData = async () => {
    fetchData(formFields, setTableData);
  };

  useEffect(() => {
    runFetchData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target;
    if (value === "") {
      setFormData((prev: any) => ({
        ...prev,
        [name as string]: null,
      }));
      return;
    }
    setFormData((prev: any) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  return {
    formData,
    handleChange,
    tableData,
    runFetchData,
  };
};
