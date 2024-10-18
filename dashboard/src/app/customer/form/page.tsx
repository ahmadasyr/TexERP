"use client";
import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import {
  NewTextField,
  NewSelect,
  NewCheckBox,
  NewRelation,
  NewDate,
} from "../../../components/form/FormFields";
import { useFormData } from "./useFormData";
import { formFields } from "../customer";

const CustomerForm: React.FC = () => {
  const { formData, handleChange, handleSubmit, tableData } = useFormData();

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

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Customer Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderField({
            type: "text",
            field: "name",
          })}
          {renderField({ type: "select", field: "status" })}
          {renderField({ type: "select", field: "test" })}
          {renderField({ type: "checkbox", field: "foreign" })}
          {renderField({ type: "relation", field: "relatedPerson" })}
          {renderField({ type: "date", field: "firstRegisterDate" })}
          {renderField({ type: "relation", field: "bankId" })}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CustomerForm;
