"use client";
import { Data, formFields, tableName, title } from "../form";
import React, { useEffect } from "react";
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
import Process from "./process";
import Material from "./material";
import AuxEquipment from "./auxEquipment";
import { machine } from "os";
import Machine from "./machine";
import Costs from "./costs";
interface PageProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const Page: React.FC = ({ popupHandler, popupSetter }: PageProps) => {
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

  // subTable rows
  const [processRows, setProcessRows] = React.useState<any[]>([]);
  const [materialRows, setMaterialRows] = React.useState<any[]>([]);
  const [auxEquipmentRows, setAuxEquipmentRows] = React.useState<any[]>([]);
  const [machineRows, setMachineRows] = React.useState<any[]>([]);
  const [costRows, setCostRows] = React.useState<any[]>([]);
  const [refresh, setRefresh] = React.useState<boolean>(false);
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
          setProcessRows(data.process || []);
          setMaterialRows(data.material || []);
          setAuxEquipmentRows(data.auxEquipment || []);
          setMachineRows(data.machine || []);
          setCostRows(data.costs || []);
          setRefresh(!refresh);
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

  // Stepper variables
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    "Genel Bilgi",
    "Onay Kutular",
    "Prosesler",
    "Malzemeler",
    "Yardımcı Ekipmanlar",
    "Makineler",
    "Maliyetler",
  ];

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
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepButton
                    color="inherit"
                    onClick={() => setActiveStep(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <Divider style={{ margin: "1rem" }} />

          {activeStep === 0 ? (
            <>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <NewDate {...allProps} keyProp="date" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewRelation {...allProps} keyProp="customerId" />
                </Grid>
              </Grid>
              <Divider style={{ margin: "1rem" }} />
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <NewTextField {...allProps} keyProp="productName" />
                </Grid>

                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="yearlyProductionCount" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewDate {...allProps} keyProp="startDateGoal" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="productPriceGoal" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="rawMaterialCost" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="productionCost" />
                </Grid>

                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="cost" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="customerBudget" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <NewNumber {...allProps} keyProp="priceDifferencePercent" />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <NewMultiEntryField {...allProps} keyProp="attendees" />
                </Grid>
              </Grid>
            </>
          ) : activeStep === 1 ? (
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="marketReady" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="demandReady" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="legalReady" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="testReady" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="productionReady" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="measurementReady" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="suitable" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewCheckBox {...allProps} keyProp="costsCovered" />
              </Grid>
            </Grid>
          ) : activeStep === 2 ? (
            <Process
              refresh={refresh}
              subRows={processRows}
              setSubRows={setProcessRows}
              handleChange={handleChange}
            />
          ) : activeStep === 3 ? (
            <Material
              refresh={refresh}
              subRows={materialRows}
              setSubRows={setMaterialRows}
              handleChange={handleChange}
            />
          ) : activeStep === 4 ? (
            <AuxEquipment
              refresh={refresh}
              subRows={auxEquipmentRows}
              setSubRows={setAuxEquipmentRows}
              handleChange={handleChange}
            />
          ) : activeStep === 5 ? (
            <Machine
              refresh={refresh}
              subRows={machineRows}
              setSubRows={setMachineRows}
              handleChange={handleChange}
            />
          ) : activeStep === 6 ? (
            <Costs
              refresh={refresh}
              subRows={costRows}
              setSubRows={setCostRows}
              handleChange={handleChange}
            />
          ) : null}
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

export default Page;
