"use client";
import { Data, formFields, tableName, title } from "../order";
import React, { useEffect } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import {
  NewTextField,
  NewSelect,
  NewCheckBox,
  NewRelation,
  NewDate,
} from "@/components/form/FormFields";
import { useFormData } from "@/components/form/utils";
import { FormModal } from "@/components/form/modal";
import Popup from "@/components/form/Popup";
import { useSearchParams } from "next/navigation";
import Sheet from "./sheet";
import { getPersonnelInfo } from "@/contexts/auth";
interface Page {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const Page: React.FC = ({ popupHandler, popupSetter }: Page) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const supplierId = searchParams.get("supplierId");
  const { formData, handleChange, tableData, runFetchData } =
    useFormData<Data>(formFields);
  const [alertValue, setAlertValue] = React.useState<number>(0);
  const [popup, setPopup] = React.useState<any>({
    on: false,
    table: "",
    column: "",
  });
  const [refresh, setRefresh] = React.useState<boolean>(false);
  useEffect(() => {
    if (id && !popupHandler) {
      fetch(`/api/${tableName}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          Object.keys(data).forEach((key) => {
            if (key !== "outsourceOrderItem") {
              handleChange({
                target: { name: key, value: data[key] },
              } as React.ChangeEvent<{ name: string; value: any }>);
            }
          });
          setSubRows(data.outsourceOrderItem);
          setRefresh(!refresh);
        });
    }
    if (supplierId) {
      handleChange({
        target: { name: "supplierId", value: Number(supplierId) },
      } as React.ChangeEvent<{ name: string; value: any }>);
    }
    if (!id) {
      handleChange({
        target: { name: "createdAt", value: new Date().toISOString() },
      } as React.ChangeEvent<{ name: string; value: any }>);
      handleChange({
        target: { name: "personnelId", value: getPersonnelInfo().id },
      } as React.ChangeEvent<{ name: string; value: any }>);
    }
  }, [id, supplierId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rows = subRows.map((row) => {
      const { isNew, outsourceOrderId, ...rest } = row;
      return rest;
    });
    if (id) {
      try {
        const response = await fetch(`/api/${tableName}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            outsourceOrderItem: rows,
          }),
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
        // add personnelId to formData
        formData["personnelId"] = getPersonnelInfo().id;

        const response = await fetch(`/api/${tableName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            outsourceOrderItem: rows,
          }),
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

  const [oldFormData, setOldFormData] = React.useState<any>({});

  useEffect(() => {
    formFields.forEach((field) => {
      if (
        field.relation &&
        oldFormData[field.name as keyof Data] !==
          formData[field.name as keyof Data]
      ) {
        runFetchData();
      }
    });
    setOldFormData(formData);
    if (formData.supplierId) {
      // get customer info
      tableData.find((row) => {
        row.name === "customer" &&
          row.values.find((value: any) => {
            if (value.id === formData.supplierId) {
              setSelectedCustomer(value);
            }
          });
      });
    }
  }, [formData]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
  const [subRows, setSubRows] = React.useState<any[]>([]);
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
          <Typography mb={4} variant="h4" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={1}>
            <Grid container spacing={1}>
              {id && (
                <Grid item xs={12} md={12}>
                  <NewCheckBox {...allProps} keyProp="closed" />
                </Grid>
              )}
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="supplierId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewDate {...allProps} keyProp="createdAt" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation
                  {...allProps}
                  keyProp="outsourceTypeId"
                  disabled={id ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewSelect
                  {...allProps}
                  keyProp="stockStatus"
                  disabled={id ? true : false}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <NewTextField {...allProps} keyProp="description" />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2, width: "100%" }} />
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} style={{ overflow: "auto" }}>
                {formData.outsourceTypeId && formData.stockStatus && (
                  <Sheet
                    refresh={refresh}
                    subRows={subRows}
                    setSubRows={setSubRows}
                    formData={formData as any}
                  />
                )}
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
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default Page;
