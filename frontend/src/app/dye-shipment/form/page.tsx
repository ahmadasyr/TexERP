"use client";
import { Data, formFields, tableName, title } from "../orderShipment";
import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  Tab,
  Tabs,
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
import Sheet from "./sheet";
import { usePersonnelId } from "@/contexts/auth";
interface Page {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const Page: React.FC = ({ popupHandler, popupSetter }: Page) => {
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
  const [refresh, setRefresh] = React.useState<boolean>(false);
  useEffect(() => {
    if (id && !popupHandler) {
      fetch(`/api/${tableName}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          Object.keys(data).forEach((key) => {
            if (key !== "dyeShipmentItem") {
              handleChange({
                target: { name: key, value: data[key] },
              } as React.ChangeEvent<{ name: string; value: any }>);
            }
          });
          setRefresh(!refresh);
        });
    }
  }, [id]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rows = subRows.map((row) => {
      const { isNew, yarnOrderId, ...rest } = row;
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
            dyeShipmentItem: rows,
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
        formData["personnelId"] = usePersonnelId();
        const response = await fetch(`/api/${tableName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            dyeShipmentItem: rows,
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
  }, [formData]);
  const [subRows, setSubRows] = React.useState<any[]>([]);
  const [tabValue, setTabValue] = React.useState<number>(0);
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
            <Grid item xs={12} md={12}>
              <NewCheckBox {...allProps} keyProp="closed" />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="dyeOrderId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewDate {...allProps} keyProp="createdAt" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewDate {...allProps} keyProp="sentDate" />
              </Grid>

              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="shippingCompanyId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="shippingCarrierId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="shippingCarId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="personnelId" />
              </Grid>
            </Grid>
            <Divider sx={{ margin: "1rem" }} />
            <Grid marginTop={"1rem"} container spacing={1}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
              >
                <Tabs
                  value={tabValue}
                  onChange={(event, newValue) => setTabValue(newValue)}
                  aria-label="basic tabs example"
                >
                  {formData.dyeOrderItems &&
                    formData.dyeOrderItems.map((item: any, index: number) => {
                      return (
                        <Tab
                          key={index}
                          value={index}
                          label={`${item?.dyeColorName} - ${item?.lot} - ${
                            item?.yon ? "B" : !item.yon ? "A" : ""
                          }`}
                        />
                      );
                    })}
                </Tabs>
                <Paper
                  elevation={3}
                  style={{ padding: "16px", margin: "1rem" }}
                >
                  <Typography variant="h6" gutterBottom>
                    Okutulan Ürünler
                  </Typography>

                  {formData.dyeOrderItems &&
                    formData.dyeOrderItems.map((item: any, index: number) => {
                      return (
                        tabValue == index && (
                          <Box key={index}>
                            <Typography variant="h6" gutterBottom>
                              Kazan No: {item.kazanNo}
                            </Typography>
                            <Sheet
                              refresh={refresh}
                              subRows={item?.scannedItems || []}
                            />
                          </Box>
                        )
                      );
                    })}
                </Paper>
              </Box>
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
