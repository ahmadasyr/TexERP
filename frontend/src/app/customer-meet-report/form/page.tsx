"use client";
import { Data, formFields, tableName, title } from "../report";
import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Typography,
  ButtonGroup,
  Tooltip,
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
interface CustomerComplaintProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const CustomerComplaint: React.FC = ({
  popupHandler,
  popupSetter,
}: CustomerComplaintProps) => {
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
      fetch(`/api/${tableName}/${id}`)
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
        const response = await fetch(`/api/${tableName}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          // If the status is not in the range 200-299, handle it as an error

          setAlertValue(response.status);
        } else {
          const data = await response.json();

          setAlertValue(200); // Set success status
        }
      } catch (error) {
        setAlertValue(500); // Handle network or other fetch-related errors
      }
    } else {
      try {
        const response = await fetch(`/api/${tableName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          // If the status is not in the range 200-299, handle it as an error

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
        handleChange={handleChange}
        formData={formData}
      />
      <form
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
        onSubmit={handleSubmit}
      >
        <Box width={"100%"}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={1}>
            {" "}
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="personnelId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="customerId" />
            </Grid>
          </Grid>

          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="revisionDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="meetDate" />
            </Grid>

            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="visitReason" />
            </Grid>

            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="city" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="district" />
            </Grid>

            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="wayOfMeeting" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField
                {...allProps}
                multiline={true}
                keyProp="contentsOfMeeting"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField
                {...allProps}
                multiline={true}
                keyProp="customerNote"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField
                {...allProps}
                multiline={true}
                keyProp="responseToCustomer"
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={1}>
            {" "}
            <Grid item xs={12} md={4}>
              <NewMultiEntryField {...allProps} keyProp="peopleMet" />
            </Grid>
          </Grid>
          <ButtonGroup
            variant="outlined"
            aria-label="Loading button group"
            style={{ display: "flex", justifyContent: "right" }}
          >
            {/* Save Button */}
            <Tooltip title="Kaydetmek için tıklayın">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Kaydet
              </Button>
            </Tooltip>

            {/* Restore Button */}
            <Tooltip title="Formu yerel verilerle geri yükle">
              <Button
                onClick={() => {
                  setAlertValue(-2);
                }}
                variant="contained"
                color="secondary"
                size="large"
              >
                Geri Yükle
              </Button>
            </Tooltip>

            {/* Reset Button */}
            <Tooltip title="Formu sıfırla">
              <Button
                onClick={() => {
                  setAlertValue(-1);
                }}
                variant="text"
                color="error"
                size="large"
              >
                Sıfırla
              </Button>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </form>
    </>
  );
};

export default CustomerComplaint;
