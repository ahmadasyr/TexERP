"use client";
import React, { use, useEffect } from "react";
import { Alert, Box, Button, Grid, Modal, Typography } from "@mui/material";
import {
  NewTextField,
  NewSelect,
  NewCheckBox,
  NewRelation,
  NewDate,
  NewNumber,
  NewEmail,
  NewPhone,
} from "@/components/form/FormFields";
import { useFormData } from "@/components/form/utils";
import { FormModal } from "@/components/form/modal";
import Popup from "@/components/form/Popup";
import { useSearchParams } from "next/navigation";
interface FormComponentProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render: any[];
  Data: any;
  formFields: any[];
  tableName: string;
  title?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  popupHandler,
  popupSetter,
  render,
  Data,
  formFields,
  tableName,
  title,
}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { formData, handleChange, tableData } = useFormData<Data>(formFields);
  const [alertValue, setAlertValue] = React.useState<number>(0);
  const [popup, setPopup] = React.useState<any>({
    on: false,
    table: "",
    column: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/customer/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          Object.keys(data).forEach((key) => {
            handleChange({
              target: { name: key, value: data[key] },
            } as React.ChangeEvent<{ name: string; value: any }>);
          });
        });
    }
  }, [id]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/${tableName}/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          // If the status is not in the range 200-299, handle it as an error
          console.error("HTTP error:", response.status);
          setAlertValue(response.status);
        } else {
          const data = await response.json();
          console.log("Success:", data);
          setAlertValue(200); // Set success status
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertValue(500); // Handle network or other fetch-related errors
      }
    } else {
      try {
        const response = await fetch(`http://localhost:3001/api/${tableName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          // If the status is not in the range 200-299, handle it as an error
          console.error("HTTP error:", response.status);
          setAlertValue(response.status);
        } else {
          const data = await response.json();
          console.log("Success:", data);
          if (popupHandler) {
            console.log("YES", data);
            popupHandler(data);
            if (popupSetter) {
              popupSetter({ on: false, table: "" });
            }
            return;
          }
          setAlertValue(200); // Set success status
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertValue(500); // Handle network or other fetch-related errors
      }
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const popUpDataParser = (data: any) => {
    handleChange({
      target: { name: popup.column, value: data.id },
    } as React.ChangeEvent<{ name: string; value: any }>);
  };

  interface FieldProps {
    type: string;
    field: string;
  }

  const renderField = ({ type, field }: FieldProps) => {
    let allProps = {
      keyProp: field,
      formFields,
      formData,
      handleChange,
      tableData,
      togglePopup,
    };
    switch (type) {
      case "text":
        return <NewTextField {...allProps} />;
      case "select":
        return <NewSelect {...allProps} />;
      case "checkbox":
        return <NewCheckBox {...allProps} />;
      case "relation":
        return <NewRelation {...allProps} />;
      case "date":
        return <NewDate {...allProps} />;
      case "number":
        return <NewNumber {...allProps} />;
      case "email":
        return <NewEmail {...allProps} />;
      case "phone":
        return <NewPhone {...allProps} />;
      default:
        return null;
    }
  };

  function togglePopup(data: any) {
    const { table, column } = data;
    setPopup({
      on: !popup.on,
      table: table,
      column: column,
    });
  }

  return (
    <>
      <Popup
        open={popup.on}
        table={popup.table}
        togglePopup={togglePopup}
        popupHandler={popUpDataParser}
        popupSetter={setPopup}
      ></Popup>
      <FormModal alertValue={alertValue} setAlertValue={setAlertValue} />
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{
            padding: 2,
            backgroundColor: "background.paper",
            margin: "auto",
            maxWidth: "80%",
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          {render.map((field: any) => (
            <Grid item xs={12} sm={6} md={4} key={field.field}>
              {renderField(field)}
            </Grid>
          ))}
          <Grid item xs={12}></Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default FormComponent;
