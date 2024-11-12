"use client";
import { Data, formFields, tableName, title } from "../customer";
import React, { use, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
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
interface customerProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render: any[];
}

const customer: React.FC<customerProps> = ({ popupHandler, popupSetter }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { formData, handleChange, tableData, runFetchData } =
    useFormData<Data>(formFields);
  const [alertValue, setAlertValue] = React.useState<number>(0);
  const [popup, setPopup] = React.useState<any>({
    on: false,
    table: "",
    column: "",
  });

  useEffect(() => {
    if (id && !popupHandler) {
      fetch(`http://localhost:3001/api/${tableName}/${id}`)
        .then((response) => response.json())
        .then((data) => {
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

          if (popupHandler) {
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

  const popUpDataParser = (data: any) => {
    handleChange({
      target: { name: popup.column, value: data.id },
    } as React.ChangeEvent<{ name: string; value: any }>);
  };

  interface FieldProps {
    type: string;
    field: string;
  }
  let allProps = {
    formFields,
    formData,
    handleChange,
    tableData,
    togglePopup,
  };

  function togglePopup(table: string, column: string) {
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
      <FormModal
        isPopup={popupHandler ? true : false}
        alertValue={alertValue}
        setAlertValue={setAlertValue}
      />
      <form
        onSubmit={handleSubmit}
        style={
          popupHandler
            ? {}
            : {
                marginTop: "5%",
                margin: "5% auto 5% auto",
                width: "90%",
                display: "flex",
                padding: "5%",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(0,0,0,0.15)",
                borderRadius: ".5rem",
              }
        }
      >
        <Box width="100%">
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Grid item xs={12} md={12}>
              <NewCheckBox {...allProps} keyProp="foreign" />
            </Grid>
          </Box>
          <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="name" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="relatedPerson" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="title" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewEmail {...allProps} keyProp="email" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewPhone {...allProps} keyProp="phoneNumber" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="firstOfferDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="firstRegisterDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="status" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="returnDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="salesOpinion" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="creditNote" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="shippingMethod" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="meterLimit" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="address" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="city" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="taxNumber" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="paymentKind" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="note" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="iban" />{" "}
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="swift" />
            </Grid>
          </Grid>
          <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="personnelId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="taxOfficeId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="bankId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="currencyId" />
            </Grid>
          </Grid>
          <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Kaydet
          </Button>
        </Box>
      </form>
    </>
  );
};

export default customer;
