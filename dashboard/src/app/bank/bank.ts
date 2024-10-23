import { HeadCell } from "../../components/table/utils";
import { createField } from "../../components/form/utils";
export const tableName = "bank";

export interface Data {
  id: number;
  name: string;
}

export const formFields = [
  createField({ name: "name", label: "Name", type: "text" }),
  createField({
    name: "bankId",
    label: "bank",
    type: "number",
    relation: true,
    table: "bank",
    value: "id",
    displayValue: ["name"],
  }),
];

export const headCells: HeadCell[] = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
];

export const fetchData = async (setRows: any) => {
  try {
    const response = await fetch("http://localhost:3001/api/bank");
    const data = await response.json();
    console.log(data);
    setRows(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

export const title = "Bank";
