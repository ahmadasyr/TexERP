"use client";
import { Data, formFields, tableName, title } from "../offer";
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
  NewMultiEntryField,
} from "@/components/form/FormFields";
import { useFormData } from "@/components/form/utils";
import { FormModal } from "@/components/form/modal";
import Popup from "@/components/form/Popup";
import { useSearchParams } from "next/navigation";
interface PageProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render: any[];
}

const Page: React.FC<PageProps> = ({ popupHandler, popupSetter }) => {
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
        style={
          popupHandler
            ? {}
            : {
                marginTop: "5%",
                width: "90% !important",
                display: "flex",
                padding: "5%",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(0,0,0,0.15)",
                borderRadius: ".5rem",
              }
        }
        onSubmit={handleSubmit}
      >
        <Box width={"100%"}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="customerId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="offerNo" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="saleNo" />
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
              <NewDate {...allProps} keyProp="offerDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="date" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="proformaNo" />
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
              <NewNumber {...allProps} keyProp="requestNo" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="requestDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="requestDeadline" />
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
              <NewNumber {...allProps} keyProp="requestBudget" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="productId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="specification" />
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
              <NewTextField {...allProps} keyProp="detail" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="quantity" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="unit" />
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
              <NewNumber {...allProps} keyProp="price" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="currencyId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="vat" />
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
              <NewNumber {...allProps} keyProp="total" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="maturity" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="daysDue" />
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
              <NewDate {...allProps} keyProp="deadlineDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="specialRequirement" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="deliveryAddress" />
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
              <NewSelect {...allProps} keyProp="shippingMethod" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="proformaDetails" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="packingListNo" />
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
              <NewTextField {...allProps} keyProp="additionalTerms" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="validPeriod" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="validPeriodType" />
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
              <NewMultiEntryField {...allProps} keyProp="conditions" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="lastValidityDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="acceptanceDate" />
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
              <NewDate {...allProps} keyProp="rejectionDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="status" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="meetNote" />
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
              <NewDate {...allProps} keyProp="lastMeetDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="meetStatement" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="totalKDV" />
            </Grid>
          </Grid>
          <Button
            style={{ marginTop: "1rem" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Kaydet
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Page;
