import Handsontable from "handsontable";
const columnTypeMap = {
  number: Handsontable.cellTypes.numeric,
  text: "text",
  date: "date",
  float: "numeric",
  relation: "autocomplete",
  boolean: "checkbox",
  datetime: "datetime",
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
          };
        } else if (cell.type === "datetime") {
          return [
            {
              type: "date",
              title: `${cell.label} (Tarih)`,
              //   correctFormat: true,
              //   validator: "date",
              key: cell.name,
              dateFormat: "MM/DD/YYYY",
              correctFormat: true,
            },
            {
              key: cell.name,
              title: `${cell.label} (Zaman)`,
              type: "time",
              timeFormat: "h:mm:ss a",
              correctFormat: true,
            },
          ];
        } else {
          return {
            type: columnTypeMap[cell.type] || "text",
            title: cell.label,
            validator: validatorMap[cell.type],
            readOnly: cell?.disabled,
            key: cell.name,
          };
        }
      }
    )
    .flat();
}
