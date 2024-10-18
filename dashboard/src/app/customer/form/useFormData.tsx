import { useState, useEffect } from "react";
import { Data, formFields } from "../customer"; // Adjust path accordingly

export const useFormData = () => {
  const [formData, setFormData] = useState<Data>({
    id: 0,
    name: "",
    foreign: false,
    relatedPerson: "",
    title: "",
    email: "",
    phoneNumber: "",
    firstOffer: new Date(),
    firstRegisterDate: new Date(),
    status: "",
    returnDate: new Date(),
    salesOpinion: "",
    creditNote: "",
    shippingMethod: "",
    meterLimit: 0,
    address: "",
    city: "",
    taxOfficeId: 0,
    taxNumber: "",
    paymentKind: "",
    note: "",
    bankId: 0,
    currencyId: 0,
    iban: "",
    swift: "",
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
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    tableData,
  };
};
