import Handsontable from "handsontable";
import { text } from "stream/consumers";
const columnTypeMap = {
  number: Handsontable.cellTypes.numeric,
  text: "text",
  date: "date",
  float: "numeric",
  relation: "autocomplete",
  boolean: "checkbox",
  datetime: "datetime",
  select: "dropdown",
};
const validatorMap: Record<string, Handsontable.ValidatorType> = {
  number: "numeric",
  date: "date",
  float: "numeric",
  relation: "autocomplete",
};

export function getColumnConfig(columnTypes: any[], tableData: any[]) {
  return columnTypes
    .map(
      (cell: {
        type: keyof typeof columnTypeMap;
        table?: string;
        displayValue?: string[];
        label: string;
        disabled?: boolean;
        name: string;
        value: string;
        options?: string[];
        required?: boolean;
      }) => {
        if (cell.type === "relation") {
          const relatedTable =
            tableData.find((table) => table.name === cell.table)?.values || [];
          return {
            type: columnTypeMap[cell.type],
            source: relatedTable.map(
              (row: { [x: string]: any }) =>
                row[cell.value] +
                " - " +
                cell.displayValue?.map((field) => row[field]).join(", ")
            ),
            strict: true,
            title: cell.label,
            key: cell.name,
            allowEmpty: !cell.required || cell.disabled,
          };
        } else if (cell.type === "datetime") {
          return [
            {
              type: "date",
              title: `${cell.label} (Tarih)`,
              //   correctFormat: true,
              //   validator: "date",
              key: cell.name,
              dateFormat: "DD/MM/YYYY",
              correctFormat: true,
              allowEmpty: !cell.required || cell.disabled,
            },
            {
              key: cell.name,
              title: `${cell.label} (Zaman)`,
              type: "time",
              timeFormat: "h:mm:ss a",
              correctFormat: true,
              allowEmpty: !cell.required || cell.disabled,
            },
          ];
        } else if (cell.type === "select") {
          return {
            type: columnTypeMap[cell.type],
            title: cell.label,
            source: cell.options,
            key: cell.name,
            allowEmpty: !cell.required || cell.disabled,
          };
        } else {
          return {
            type: columnTypeMap[cell.type] || "text",
            title: cell.label,
            validator: validatorMap[cell.type],
            readOnly: cell?.disabled,
            key: cell.name,
            strict: true,
            dateFormat: "DD/MM/YYYY",
            allowEmpty: !cell.required || cell.disabled,
          };
        }
      }
    )
    .flat();
}
