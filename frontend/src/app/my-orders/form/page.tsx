"use client";
import { Data, formFields, tableName, title } from "../order";
import React, { useEffect } from "react";
import departments from "../../profile/departments.json";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
import OrderSheet from "./orderSheet";
import { getPersonnelInfo, usePersonnelId } from "@/contexts/auth";
interface Page {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
  render?: any[];
}

const Page: React.FC = ({ popupHandler, popupSetter }: Page) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const purchaseRequestId = searchParams.get("purchaseRequestId");
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
            if (key !== "purchaseOrderItem") {
              handleChange({
                target: { name: key, value: data[key] },
              } as React.ChangeEvent<{ name: string; value: any }>);
            }
          });
          setSubRows(data.purchaseOrderItem || []);
          setRequest(data.purchaseRequest);
          setRefresh(!refresh);
        });
    }
  }, [id]);

  const [request, setRequest] = React.useState<any>({});
  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch("/api/currency");
      const data = await response.json();
      setCurrencies(data);
    };
    fetchCurrencies();
    if (!id) {
      handleChange({
        target: { name: "personnelId", value: getPersonnelInfo().id },
      } as React.ChangeEvent<{ name: string; value: any }>);
      handleChange({
        target: { name: "createdAt", value: new Date().toISOString() },
      } as React.ChangeEvent<{ name: string; value: any }>);
      handleChange({
        target: {
          name: "purchaseRequestId",
          value: purchaseRequestId,
        },
      } as React.ChangeEvent<{ name: string; value: any }>);
    }
    if (purchaseRequestId) {
      fetch(`/api/purchase-request/${purchaseRequestId}`)
        .then((response) => response.json())
        .then((data) => {
          setRequest(data);
        });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rows = subRows.map(({ isNew, purchaseRequestId, ...rest }) => {
      if (rest.isNew) delete rest.id;
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
            purchaseOrderItem: rows,
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
            purchaseOrderItem: rows,
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
  const [tab, setTab] = React.useState<number>(1);
  const [needApproval, setNeedApproval] = React.useState<boolean>(false);
  const [currencies, setCurrencies] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  useEffect(() => {
    const price = subRows.reduce(
      (sum, row) =>
        sum +
        row.quantity *
          row.pricePerUnit *
          (1 + row.vat / 100) *
          currencies.find((c) => c.id === row.currencyId)?.rate,
      0
    );
    setTotal(price);
    if (getPersonnelInfo().buyingLimit < price) {
      setNeedApproval(true);
      handleChange({
        target: { name: "requiresApproval", value: true },
      } as React.ChangeEvent<{ name: string; value: any }>);
    } else {
      setNeedApproval(false);
    }
  }, [subRows]);

  const colors = [
    { value: "Pending", color: "warning" },
    { value: "Approved", color: "info" },
    { value: "Rejected", color: "error" },
    { value: "Cancelled", color: "warning" },
    { value: "Completed", color: "success" },
    { value: "Returned", color: "error" },
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
          {formData.status ? (
            <Alert
              sx={{
                marginBottom: 2,
              }}
              severity={
                colors.find((c) => c.value === formData.status)?.color as
                  | "warning"
                  | "info"
                  | "error"
                  | "success"
              }
            >
              Durum:{" "}
              {
                formFields
                  .find((f) => f.name === "status")
                  ?.options?.find((v) => v.value === formData.status)?.label
              }
            </Alert>
          ) : (
            ""
          )}
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <NewDate {...allProps} keyProp="createdAt" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="personnelId" />
            </Grid>
            <Grid item xs={12} md={4}>
              <NewRelation {...allProps} keyProp="supplierId" />
            </Grid>
          </Grid>
          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <NewSelect {...allProps} keyProp="purchaseType" />
            </Grid>
            <Grid item xs={12} md={3}>
              <NewNumber {...allProps} keyProp="vade" />
            </Grid>
            <Grid item xs={12} md={3}>
              <NewSelect {...allProps} keyProp="shippingType" />
            </Grid>
            <Grid item xs={12} md={3}>
              <NewDate {...allProps} keyProp="deadline" />
            </Grid>
            {!needApproval && (
              <Grid item xs={12} md={3}>
                <NewCheckBox {...allProps} keyProp="requiresApproval" />
              </Grid>
            )}
          </Grid>{" "}
          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <Tabs
            value={tab}
            onChange={(event: React.SyntheticEvent, value: number) =>
              setTab(value)
            }
          >
            <Tab value={1} label="Satın Alma Sipariş Kalemleri" />
            <Tab value={0} label="Satın Alma Talep Detayları" />
          </Tabs>
          <Grid container spacing={1}>
            {tab === 0 ? (
              <>
                <Grid item xs={12} md={12}>
                  <Alert severity="info">
                    <Typography variant="body1" gutterBottom>
                      Satın Alma Talebi
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Talep No: {request?.id}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Talep Tarihi:{" "}
                      {new Date(request?.createdAt).toLocaleDateString("tr-TR")}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Personel: {request?.personnel?.firstName}{" "}
                      {request?.personnel?.lastName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Departman:{" "}
                      {
                        departments.find(
                          (d) => d.code === request?.personnel?.department
                        )?.name
                      }
                    </Typography>
                  </Alert>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Sheet
                    refresh={refresh}
                    subRows={request?.purchaseRequestItem}
                  />
                </Grid>
              </>
            ) : tab === 1 ? (
              <Grid item xs={12} md={12}>
                <OrderSheet
                  refresh={refresh}
                  subRows={subRows}
                  setSubRows={setSubRows}
                />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        Toplam: {total.toFixed(2)} TL
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            ) : null}
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

export default Page;
