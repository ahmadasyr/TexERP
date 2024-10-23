"use client";
import { Data, formFields, tableName, title } from "../bank";
import FormComponent from "@/components/form/FormComponent";

const render = [
  {
    field: "name",
    type: "text",
  },
];

const Page = () => {
  return (
    <FormComponent
      Data={Data}
      formFields={formFields}
      tableName={tableName}
      title={title}
      render={render}
    />
  );
};

export default Page;
