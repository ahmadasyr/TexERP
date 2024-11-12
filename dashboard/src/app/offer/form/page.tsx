"use client";
import { Data, formFields, tableName, title } from "../offer";
import React, { use, useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Step,
  StepButton,
  StepLabel,
  Stepper,
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

const formSteps = [
  {
    label: "Muşteri ve Teklif Bilgileri",
    fields: [
      { component: NewRelation, keyProp: "customerId" },
      { component: NewNumber, keyProp: "offerNo" },
      { component: NewNumber, keyProp: "saleNo" },
      { component: NewDate, keyProp: "offerDate" },
      { component: NewDate, keyProp: "date" },
      { component: NewNumber, keyProp: "proformaNo" },
      { component: NewTextField, keyProp: "proformaDetails" },
      { component: NewNumber, keyProp: "requestNo" },
      { component: NewDate, keyProp: "lastMeetDate" },
      { component: NewTextField, keyProp: "meetStatement" },
    ],
  },
  {
    label: "Ürün ve İstek Bilgileri",
    fields: [
      { component: NewRelation, keyProp: "productId" },
      { component: NewNumber, keyProp: "requestBudget" },
      { component: NewTextField, keyProp: "specification" },
      { component: NewTextField, keyProp: "detail" },
      { component: NewNumber, keyProp: "quantity" },
      { component: NewSelect, keyProp: "unit" },
    ],
  },
  {
    label: "Fiyat ve KDV Bilgileri",
    fields: [
      { component: NewNumber, keyProp: "price" },
      { component: NewRelation, keyProp: "currencyId" },
      { component: NewNumber, keyProp: "vat" },
      { component: NewNumber, keyProp: "total" },
      { component: NewNumber, keyProp: "maturity" },
      { component: NewNumber, keyProp: "totalKDV" },
    ],
  },
  {
    label: "Teslimat Bilgileri",
    fields: [
      { component: NewTextField, keyProp: "specialRequirement" },
      { component: NewTextField, keyProp: "deliveryAddress" },
      { component: NewSelect, keyProp: "shippingMethod" },
      { component: NewNumber, keyProp: "packingListNo" },
    ],
  },
  {
    label: "Termin ve Süre Bilgileri",
    fields: [
      { component: NewDate, keyProp: "requestDate" },
      { component: NewDate, keyProp: "requestDeadline" },
      { component: NewNumber, keyProp: "daysDue" },
      { component: NewDate, keyProp: "deadlineDate" },
      { component: NewNumber, keyProp: "validPeriod" },
      { component: NewSelect, keyProp: "validPeriodType" },
      { component: NewDate, keyProp: "lastValidityDate" },
    ],
  },
  {
    label: "Özel Koşullar",
    fields: [
      { component: NewMultiEntryField, keyProp: "conditions" },
      { component: NewMultiEntryField, keyProp: "additionalTerms" },
    ],
  },
  {
    label: "Durum ve Onay Bilgileri",
    fields: [
      { component: NewSelect, keyProp: "status" },
      { component: NewDate, keyProp: "acceptanceDate" },
      { component: NewDate, keyProp: "rejectionDate" },
      { component: NewTextField, keyProp: "meetNote" },
    ],
  },
];

const Page: React.FC<PageProps> = ({ popupHandler, popupSetter }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);

  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCompletedSteps((prev) => {
        const newCompletedSteps = [...prev];
        newCompletedSteps[activeStep] = true;
        return newCompletedSteps;
      });
      setActiveStep((prev) => prev + 1);
    } else {
      if (formRef.current) {
        formRef.current.reportValidity();
      }
    }
  };
  const handleStep = (step: number) => () => setActiveStep(step);

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const formRef = useRef<HTMLFormElement>(null);

  const isLastStep = activeStep === formSteps.length - 1;
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
          console.error("HTTP error:", response.status);
          setAlertValue(response.status);
        } else {
          const data = await response.json();
          setAlertValue(200);
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertValue(500);
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
          setAlertValue(200);
        }
      } catch (error) {
        console.error("Error:", error);
        setAlertValue(500);
      }
    }
  };

  const canProceedToNextStep = () => {
    const currentStepFields = formSteps[activeStep].fields;
    return currentStepFields.every(({ keyProp }) => {
      const field = formFields.find((f) => f.name === keyProp);
      return (
        !field?.required ||
        (keyProp in formData && formData[keyProp as keyof Data])
      );
    });
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

  useEffect(() => {
    // Check if necessary form data fields are present
    const { validPeriod, validPeriodType, requestDate } = formData;
    if (validPeriod && validPeriodType && requestDate) {
      // Initialize dates
      const startDate = new Date(requestDate);
      const adjustedDate = new Date(startDate);

      // Adjust 'adjustedDate' based on 'validPeriodType' and 'validPeriod'
      switch (validPeriodType) {
        case "ay": // Months
          adjustedDate.setMonth(adjustedDate.getMonth() + validPeriod);
          break;
        case "hafta": // Weeks
          adjustedDate.setDate(adjustedDate.getDate() + validPeriod * 7);
          break;
        case "gün": // Days
          adjustedDate.setDate(adjustedDate.getDate() + validPeriod);
          break;
        default:
          console.warn(`Unexpected validPeriodType: ${validPeriodType}`);
          return; // Exit if the validPeriodType is unexpected
      }

      // Convert the calculated date to the ISO format (YYYY-MM-DD)
      const calculatedValidityDate = adjustedDate.toISOString().split("T")[0];

      // Only trigger handleChange if the new date differs from the current one
      if (
        new Date(formData.lastValidityDate).toISOString().split("T")[0] !==
        calculatedValidityDate
      ) {
        handleChange({
          target: {
            name: "lastValidityDate",
            value: calculatedValidityDate,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, [formData, handleChange]);

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
        ref={formRef}
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
        <Box width="100%">
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>

          <Stepper
            nonLinear
            style={{ marginBottom: "1rem" }}
            activeStep={activeStep}
            alternativeLabel
          >
            {formSteps.map((step, index) => (
              <Step completed={completedSteps[index]} key={index}>
                <StepButton onClick={handleStep(index)}>
                  {step.label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={1}>
            {formSteps[activeStep].fields.map(
              ({ component: Component, keyProp }) => (
                <Grid item xs={12} md={4} key={keyProp}>
                  <Component {...allProps} keyProp={keyProp} />
                </Grid>
              )
            )}
          </Grid>

          <Divider style={{ marginBottom: "1rem", marginTop: "1rem" }} />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
            >
              Geri
            </Button>
            {!isLastStep ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                variant="contained"
                color="primary"
              >
                Adımı tamamla
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Kaydet
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Page;
