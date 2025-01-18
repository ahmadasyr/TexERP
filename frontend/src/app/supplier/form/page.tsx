"use client";
import { Data, formFields, tableName, title } from "../supplier";
import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Modal,
  Tooltip,
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
  render?: any[];
}

const customer: React.FC<any> = ({
  popupHandler,
  popupSetter,
}: customerProps) => {
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
        {/* go back simple button text with arrow */}

        <Box width="100%">
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Grid item xs={12} md={4}>
              <NewCheckBox {...allProps} keyProp="foreign" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="suitable" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="approved" />
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
              <NewTextField {...allProps} keyProp="materials" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="supplierScore" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="evaluationDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="createdAt" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="entryScore" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="maxApprovalDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="contractType" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="contractDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="contractValidityPeriod" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewSelect {...allProps} keyProp="selfPickup" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="address" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewPhone {...allProps} keyProp="phone" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewEmail {...allProps} keyProp="email" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="vade" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="taxNumber" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="taxOfficeId" />
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
              <NewTextField {...allProps} keyProp="authorizedPerson" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewPhone {...allProps} keyProp="authorizedPersonPhone" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewEmail {...allProps} keyProp="authorizedPersonEmail" />
            </Grid>
          </Grid>
          {/* <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewCheckBox {...allProps} keyProp="iso9001Status" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewCheckBox {...allProps} keyProp="iso14001Status" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewCheckBox {...allProps} keyProp="iso45001Status" />
            </Grid>
          </Grid> */}
          <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />
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
            {!popupHandler && (
              <>
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
              </>
            )}
          </ButtonGroup>
        </Box>
      </form>
    </>
  );
};

export default customer;
