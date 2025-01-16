"use client";
import { Stepper, Step, StepLabel, StepContent, Paper } from "@mui/material";
import { Data, formFields, tableName, title } from "../offer";
import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
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
  const orderId = searchParams.get("orderId");
  const [orderData, setOrderData] = React.useState<any>({});
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
            if (key !== "offerItem") {
              handleChange({
                target: { name: key, value: data[key] },
              } as React.ChangeEvent<{ name: string; value: any }>);
            }
          });
          setSubRows(data.offerItem || []);
          setRefresh(!refresh);
        });
    }
    if (orderId && !popupHandler) {
      fetch(`/api/${tableName}/order/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
          handleChange({
            target: { name: "orderId", value: data.id },
          } as React.ChangeEvent<{ name: string; value: any }>);
          setOrderData(data || []);
          setSubRows(
            data.orderItems.map((item: any) => {
              return {
                id: Math.random(),
                productName: item.product?.name,
                orderItemId: item.id,
                price: 0,
                vatRate: 0,
                total: 0,
                totalVat: 0,
                vade: null,
              };
            })
          );
        });
      setRefresh(!refresh);
    }
  }, [id, orderId]);
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
            offerItem: rows,
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
            offerItem: rows,
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

  const steps = [
    {
      label: "Önemli Tarihler",
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <NewNumber {...allProps} keyProp="paymentDue" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewDate {...allProps} keyProp="deliveryDeadlineDate" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewNumber {...allProps} keyProp="validPeriod" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewSelect {...allProps} keyProp="validPeriodType" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewDate {...allProps} keyProp="lastValidityDate" />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Ek Şartlar ve Koşullar",
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <NewMultiEntryField {...allProps} keyProp="additionalTerms" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewMultiEntryField {...allProps} keyProp="conditions" />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Fiyat Bilgileri",
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <NewNumber {...allProps} keyProp="total" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewNumber {...allProps} keyProp="totalKDV" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewNumber {...allProps} keyProp="customerTargetPrice" />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Diğer Bilgiler",
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <NewTextField {...allProps} keyProp="detail" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewTextField {...allProps} keyProp="meetStatement" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewTextField {...allProps} keyProp="meetNote" />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Durum ve Yanıt Tarihi",
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <NewSelect {...allProps} keyProp="status" />
          </Grid>
          <Grid item xs={12} md={4}>
            <NewDate {...allProps} keyProp="responseDate" />
          </Grid>
        </Grid>
      ),
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box width={"100%"}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Bitir" : "İleri"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Geri
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Sıfırla
          </Button>
        </Paper>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Sheet
            items={orderData.orderItems}
            refresh={refresh}
            subRows={subRows}
            setSubRows={setSubRows}
          />
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
  );
};

export default Page;
