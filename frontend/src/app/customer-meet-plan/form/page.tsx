"use client";
import { Data, formFields, tableName, title } from "../plan";
import React, { useEffect } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Table,
  TextField,
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
  NewMultiRelation,
} from "@/components/form/FormFields";
import { useFormData } from "@/components/form/utils";
import { FormModal } from "@/components/form/modal";
import Popup from "@/components/form/Popup";
import { useSearchParams } from "next/navigation";
import { DataGrid, GridRowModes } from "@mui/x-data-grid";
import { CustomAutocomplete } from "@/components/table/utils";
import { trTR } from "@/components/trTrGrid";
import { Close, Delete } from "@mui/icons-material";
import { set } from "date-fns";
interface PageProps {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const Page: React.FC = ({ popupHandler, popupSetter }: PageProps) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { formData, handleChange, tableData, runFetchData } =
    useFormData<any>(formFields);
  const [alertValue, setAlertValue] = React.useState<number>(0);
  const [customerMeetPlanCustomer, setCustomerMeetPlanCustomer] =
    React.useState<
      {
        customerId: number;
        note?: string;
      }[]
    >([]);
  const [popup, setPopup] = React.useState<any>({
    on: false,
    table: "",
    column: "",
  });
  const customers: {
    id: number;
    name: string;
  }[] = tableData.find((table) => table.name === "customer")?.values || [];
  const [rowModesModel, setRowModesModel] = React.useState<{
    [key: number]: { mode: GridRowModes };
  }>({});

  useEffect(() => {
    if (id && !popupHandler) {
      fetch(`/api/${tableName}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCustomerMeetPlanCustomer(data.customerMeetPlanCustomer);
          Object.keys(data).forEach((key) => {
            handleChange({
              target: { name: key, value: data[key] },
            } as React.ChangeEvent<{ name: string; value: any }>);
          });
          handleChange({
            target: {
              name: "customerMeetPlanAttendee",
              value: data.customerMeetPlanAttendee?.map(
                (attendee: any) => attendee.personnelId
              ),
            },
          } as unknown as React.ChangeEvent<{ name: string; value: any }>);
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
          body: JSON.stringify({
            ...formData,
            customerMeetPlanCustomer,
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
        const response = await fetch(`/api/${tableName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            customerMeetPlanCustomer,
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

  function togglePopup(table: string, column: string, on: boolean) {
    setPopup({
      on: !popup.on,
      table: table,
      column: column,
    });
  }
  const [customerAlreadyExist, setCustomerAlreadyExist] = React.useState(false);
  const [currentCustomerMeetPlanCustomer, setCurrentCustomerMeetPlanCustomer] =
    React.useState<{
      customerId?: number;
      note?: string;
    }>({
      customerId: undefined,
      note: "",
    });
  const addCustomerRow = () => {
    if (
      currentCustomerMeetPlanCustomer.customerId !== undefined &&
      !customerMeetPlanCustomer?.some(
        (customer) =>
          customer.customerId === currentCustomerMeetPlanCustomer.customerId
      )
    ) {
      setCustomerMeetPlanCustomer((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          ...currentCustomerMeetPlanCustomer,
          customerId: currentCustomerMeetPlanCustomer.customerId as number,
        },
      ]);
    } else if (currentCustomerMeetPlanCustomer?.customerId) {
      setCustomerAlreadyExist(true);
    }
  };

  const removeCustomerRow = (id: number) => {
    setCustomerMeetPlanCustomer((prev) =>
      prev.filter((row) => row.customerId !== id)
    );
  };
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
          <Typography variant="h6" gutterBottom>
            Ziyaret Yapan Bilgileri
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <NewMultiRelation
                multiSelect={true}
                {...allProps}
                keyProp="customerMeetPlanAttendee"
              />
            </Grid>
          </Grid>
          <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />
          <Typography variant="h6" gutterBottom>
            Ziyaret Bilgileri
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="plannedDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="realDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="returnDate" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="location" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="visitReason" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="note" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewTextField {...allProps} keyProp="result" />
            </Grid>
          </Grid>

          <Divider style={{ marginBottom: "1rem", marginTop: "1rem" }} />
          <Typography variant="h6" gutterBottom>
            Giderler
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="travelExpense" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="accommodationExpense" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="foodExpense" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="giftExpense" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="officeExpense" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewNumber {...allProps} keyProp="sampleExpense" />
            </Grid>
          </Grid>
          <Divider
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />

          <Typography mb={1} variant="h6" gutterBottom>
            Müşteri Bilgileri
          </Typography>
          <Alert
            severity="error"
            sx={{ display: customerAlreadyExist ? "" : "none", mb: 2 }}
            onClose={() => setCustomerAlreadyExist(false)}
          >
            Bu müşteri zaten eklenmiş.
          </Alert>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                options={customers}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Müşteri" variant="outlined" />
                )}
                onChange={(_, value) =>
                  setCurrentCustomerMeetPlanCustomer((prev) => ({
                    ...prev,
                    customerId: value?.id,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Not"
                value={currentCustomerMeetPlanCustomer.note}
                onChange={(event) =>
                  setCurrentCustomerMeetPlanCustomer((prev) => ({
                    ...prev,
                    note: event.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mb: 2 }}
            onClick={addCustomerRow}
          >
            Müşteri Ekle
          </Button>
          <DataGrid
            autoHeight
            localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
            columns={[
              {
                field: "customerId",
                headerName: "Müşteri",
                flex: 1,
                valueGetter: (params, row) =>
                  customers.find((customer) => customer.id === row.customerId)
                    ?.name || "",
              },
              { field: "note", headerName: "Not", flex: 1 },
              {
                field: "actions",
                headerName: "İşlemler",
                renderCell: (params) => (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeCustomerRow(params.row.customerId)}
                  >
                    Sil <Delete />
                  </Button>
                ),
              },
            ]}
            rows={customerMeetPlanCustomer}
            getRowId={(row) => row.customerId}
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
