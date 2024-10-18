import { HeadCell } from "../../components/table/utils";

export const tableName = "bank";

export default interface Data {
  id: number;
  name: string;
}
const createField = ({
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

export const formFields = [
  createField({ name: "name", label: "Name", type: "text" }),
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
