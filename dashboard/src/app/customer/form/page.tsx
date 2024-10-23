"use client";
import { Data, formFields, tableName, title } from "../customer";
import FormComponent from "@/components/form/FormComponent";

const render = [
  {
    field: "name",
    type: "text",
  },
  {
    field: "foreign",
    type: "checkbox",
  },
  {
    field: "relatedPerson",
    type: "text",
  },
  {
    field: "title",
    type: "text",
  },
  {
    field: "email",
    type: "email",
  },
  {
    field: "phoneNumber",
    type: "phone",
  },
  {
    field: "firstOffer",
    type: "date",
  },
  {
    field: "personnelId",
    type: "relation",
  },
  {
    field: "firstRegisterDate",
    type: "date",
  },
  {
    field: "status",
    type: "select",
  },
  {
    field: "returnDate",
    type: "date",
  },
  {
    field: "salesOpinion",
    type: "text",
  },
  {
    field: "creditNote",
    type: "text",
  },
  {
    field: "shippingMethod",
    type: "select",
  },
  {
    field: "meterLimit",
    type: "number",
  },
  {
    field: "address",
    type: "text",
  },
  {
    field: "city",
    type: "text",
  },
  {
    field: "taxOfficeId",
    type: "relation",
  },
  {
    field: "taxNumber",
    type: "text",
  },
  {
    field: "paymentKind",
    type: "text",
  },
  {
    field: "note",
    type: "text",
  },
  {
    field: "bankId",
    type: "relation",
  },
  {
    field: "currencyId",
    type: "relation",
  },
  {
    field: "iban",
    type: "text",
  },
  {
    field: "swift",
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
