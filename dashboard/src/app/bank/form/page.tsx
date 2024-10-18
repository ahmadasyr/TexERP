"use client";
import React, { useEffect } from "react";
import { Alert, Box, Button, Grid, Modal, Typography } from "@mui/material";
import {
  NewTextField,
  NewSelect,
  NewCheckBox,
  NewRelation,
  NewDate,
} from "../../../components/form/FormFields";
import { useFormData } from "./useFormData";
import { formFields } from "../bank";
import { FormModal } from "@/components/form/modal";

const CustomerForm: React.FC = () => {
  const { formData, handleChange, tableData } = useFormData();
  const [alertValue, setAlertValue] = React.useState<number>(0);
  interface FieldProps {
    type: string;
    field: string;
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/bank", {
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
        setAlertValue(200); // Set success status
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertValue(500); // Handle network or other fetch-related errors
    }
  };

  const renderField = ({ type, field }: FieldProps) => {
    let allProps = {
      keyProp: field,
      formFields,
      formData,
      handleChange,
      tableData,
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
      default:
        return null;
    }
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 28,
    p: 4,
  };
  let modal = (
    <FormModal alertValue={alertValue} setAlertValue={setAlertValue} />
  );
  useEffect(() => {
    modal = <FormModal alertValue={alertValue} setAlertValue={setAlertValue} />;
  }, [alertValue]);

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Bank
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {renderField({
              type: "text",
              field: "name",
            })}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CustomerForm;
