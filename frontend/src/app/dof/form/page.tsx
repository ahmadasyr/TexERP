"use client";
import { Data, formFields, tableName, title } from "../dof";
import React, { useEffect } from "react";
import { Alert, Box, Button, Grid, Modal, Typography } from "@mui/material";
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
import { getPersonnelInfo } from "@/contexts/auth";
interface DOFProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const DOF: React.FC<any> = ({ popupHandler, popupSetter }: DOFProps) => {
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
    formData["fromPersonnelId"] = personnelInfo.id;
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
  const personnelInfo = getPersonnelInfo();
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
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                border: "1px solid #000",
                padding: "20px",
                maxWidth: "800px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              {/* Header Section */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <div>
                  <img src="/logo.png" alt="Logo" style={{ height: "50px" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <h1 style={{ fontSize: "18px", margin: "0" }}>DÖFİ Formu</h1>
                  <p style={{ fontSize: "14px", margin: "0" }}>
                    (Düzeltici / Önleyici Faaliyet İsteği)
                  </p>
                </div>
                <div style={{ width: "50px" }}></div>
              </div>

              {/* DÖF Reason Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <p>
                  <strong>DÖF nedeni:</strong>
                </p>
                <NewSelect {...allProps} keyProp="reason" />
              </div>

              {/* Sender and Receiver Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <p>
                  <strong>Kimden:</strong>{" "}
                  {personnelInfo.firstName + " " + personnelInfo.lastName}
                </p>
                <p>
                  <strong>Kime:</strong>{" "}
                  <NewRelation {...allProps} keyProp="toPersonnelId" />
                </p>
                <p>
                  <strong>Tarih:</strong>{" "}
                </p>
                <NewDate {...allProps} keyProp="date" />
              </div>

              {/* Nonconformity Description Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <p>
                  <strong>Uygunsuzluğun Tanımı:</strong>
                </p>
                <NewTextField
                  {...allProps}
                  multiline={true}
                  keyProp="nonconformityDescription"
                />
              </div>

              {/* Planned Corrective Actions Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <p>
                  <strong>Planlanan Düzeltici Faaliyetler:</strong>
                </p>
                <NewTextField
                  {...allProps}
                  multiline={true}
                  keyProp="plannedCorrectiveActions"
                />
                <p>
                  <span>
                    <strong>Düzeltici Faaliyeti Planlayan:</strong>{" "}
                  </span>
                  <span style={{ float: "right" }}>
                    <strong>Termin Tarihi:</strong>{" "}
                  </span>
                </p>
                <NewDate {...allProps} keyProp="dueDate" />
              </div>

              {/* Follow-up and Closure Section */}
              <div style={{ marginTop: "10px", paddingBottom: "10px" }}>
                <p>
                  <strong>Düzeltici Faaliyetin Takibi ve Kapatılması:</strong>
                </p>
                <p>
                  <strong>Sonuç ve Açıklamalar:</strong>
                </p>
                <NewTextField
                  {...allProps}
                  multiline={true}
                  keyProp="resultsAndComments"
                />
                <p>
                  <span>
                    <strong>Takip Eden/Kapatan:</strong>{" "}
                    <NewRelation
                      {...allProps}
                      keyProp="followedByPersonnelId"
                    />
                  </span>
                  <span style={{ float: "right" }}>
                    <strong>İmza:</strong> <strong>Tarih:</strong>{" "}
                    <NewDate {...allProps} keyProp="closureDate" />
                  </span>
                </p>
              </div>
            </div>
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

export default DOF;
