"use client";
import { Data, formFields, tableName, title } from "../yarnType";
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
} from "@/components/form/FormFields";
import { useFormData } from "@/components/form/utils";
import { FormModal } from "@/components/form/modal";
import Popup from "@/components/form/Popup";
import { useSearchParams } from "next/navigation";
import { usePersonnelId } from "@/contexts/auth";
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
    formData["personnelId"] = usePersonnelId();
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

  const [oldFormData, setOldFormData] = React.useState<any>({});

  useEffect(() => {
    formFields.forEach(
      (field: { relation: any; name: string | number | symbol }) => {
        if (
          field.relation &&
          oldFormData[field.name as keyof Data] !==
            formData[field.name as keyof Data]
        ) {
          runFetchData();
        }
      }
    );
    setOldFormData(formData);
  }, [formData]);

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
            <Grid item xs={6}>
              <NewTextField {...allProps} keyProp="name" />
            </Grid>
            <Grid item xs={6}>
              <NewNumber {...allProps} keyProp="count" />
            </Grid>
            <Grid item xs={6}>
              <NewTextField {...allProps} keyProp="unit" />
            </Grid>
            <Grid item xs={6}>
              <NewTextField {...allProps} keyProp="color" />
            </Grid>
            <Grid item xs={6}>
              <NewTextField {...allProps} keyProp="colorCode" />
            </Grid>
            <Grid item xs={6}>
              <NewNumber {...allProps} keyProp="price" />
            </Grid>
            <Grid item xs={6}>
              <NewRelation {...allProps} keyProp="currencyId" />
            </Grid>
            <Grid item xs={6}>
              <NewDate {...allProps} keyProp="createdAt" />
            </Grid>
          </Grid>
          <Button
            style={{
              marginTop: "1rem",
            }}
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
