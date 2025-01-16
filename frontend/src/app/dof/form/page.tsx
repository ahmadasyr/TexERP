"use client";
import { Data, formFields, tableName, title } from "../dof";
import React, { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
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
  const [disabledColumns, setDisabledColumns] = React.useState<string[]>([]);
  useEffect(() => {
    if (id && !popupHandler) {
      fetch(`/api/${tableName}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const personnelId = getPersonnelInfo().id;
          if (personnelId !== data.fromPersonnelId) {
            setDisabledColumns([
              "fromPersonnelId",
              "toPersonnelId",
              "date",
              "reason",
              "nonconformityDescription",
            ]);
          }
          if (personnelId !== data.toPersonnelId) {
            setDisabledColumns(["plannedCorrectiveActions", "dueDate"]);
          }
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
      />
      <FormModal
        isPopup={!!popupHandler}
        alertValue={alertValue}
        setAlertValue={setAlertValue}
      />
      <form
        style={
          popupHandler
            ? {}
            : {
                marginTop: "5%",
                margin: "5% auto",
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
                  <Typography variant="h6" style={{ margin: 0 }}>
                    DÖFİ Formu
                  </Typography>
                  <Typography variant="body2" style={{ margin: 0 }}>
                    (Düzeltici / Önleyici Faaliyet İsteği)
                  </Typography>
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
                <Typography variant="body1">
                  <strong>DÖF nedeni:</strong>
                </Typography>
                {disabledColumns.includes("reason") ? (
                  <Typography>{formData.reason}</Typography>
                ) : (
                  <NewSelect {...allProps} keyProp="reason" />
                )}
              </div>

              {/* Sender and Receiver Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="body1">
                  <strong>Kimden:</strong> {formData.fromPersonnel?.firstName}{" "}
                  {formData.fromPersonnel?.lastName}
                </Typography>
                <strong>Kime:</strong>{" "}
                {disabledColumns.includes("toPersonnelId") ? (
                  <Typography variant="body1">
                    {`${formData.toPersonnel.firstName} ${formData.toPersonnel.lastName}`}
                  </Typography>
                ) : (
                  <NewRelation {...allProps} keyProp="toPersonnelId" />
                )}
                <strong>Tarih:</strong>{" "}
                {disabledColumns.includes("date") ? (
                  <Typography variant="body1">
                    {formData?.date
                      ? new Date(formData?.date).toLocaleDateString()
                      : ""}
                  </Typography>
                ) : (
                  <NewDate {...allProps} keyProp="date" />
                )}
              </div>

              {/* Nonconformity Description Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="body1">
                  <strong>Uygunsuzluğun Tanımı:</strong>
                </Typography>
                {disabledColumns.includes("nonconformityDescription") ? (
                  <Typography>{formData.nonconformityDescription}</Typography>
                ) : (
                  <NewTextField
                    {...allProps}
                    multiline={true}
                    keyProp="nonconformityDescription"
                  />
                )}
              </div>

              {/* Planned Corrective Actions Section */}
              <div
                style={{
                  marginTop: "10px",
                  borderBottom: "1px solid #000",
                  paddingBottom: "10px",
                }}
              >
                <Typography variant="body1">
                  <strong>Planlanan Düzeltici Faaliyetler:</strong>
                </Typography>
                {disabledColumns.includes("plannedCorrectiveActions") ? (
                  <Typography>{formData.plannedCorrectiveActions}</Typography>
                ) : (
                  <NewTextField
                    {...allProps}
                    multiline={true}
                    keyProp="plannedCorrectiveActions"
                  />
                )}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body1">
                    <strong>Düzeltici Faaliyeti Planlayan:</strong>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Termin Tarihi:</strong>
                  </Typography>
                </div>
                {disabledColumns.includes("dueDate") ? (
                  <Typography variant="body1">
                    {formData?.dueDate
                      ? new Date(formData?.dueDate).toLocaleDateString()
                      : ""}
                  </Typography>
                ) : (
                  <NewDate {...allProps} keyProp="dueDate" />
                )}
              </div>

              {/* Follow-up and Closure Section */}
              <div style={{ marginTop: "10px", paddingBottom: "10px" }}>
                <Typography variant="body1">
                  <strong>Düzeltici Faaliyetin Takibi ve Kapatılması:</strong>
                </Typography>
                <Typography variant="body1">
                  <strong>Sonuç ve Açıklamalar:</strong>
                </Typography>
                <NewTextField
                  {...allProps}
                  multiline={true}
                  keyProp="resultsAndComments"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Takip Eden/Kapatan:</strong>{" "}
                    </Typography>
                    <NewRelation {...allProps} keyProp="followedPersonnelId" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">
                      <strong>Kapanış Tarih:</strong>
                    </Typography>
                    <NewDate {...allProps} keyProp="closureDate" />
                  </Grid>
                </Grid>
              </div>
            </div>
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

export default DOF;
