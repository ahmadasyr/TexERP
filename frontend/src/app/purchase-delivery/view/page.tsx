"use client";
import { Data, formFields, tableName, title } from "../delivery";
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
  const id = Number(searchParams.get("id"));
  const purchaseOrderId = Number(searchParams.get("purchaseOrderId"));
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
            handleChange({
              target: { name: key, value: data[key] },
            } as React.ChangeEvent<{ name: string; value: any }>);
          });
          setSubRows(data.purchaseDeliveryItem || []);
          setRequest(data.purchaseOrder);
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
        target: {
          name: "purchaseOrderId",
          value: purchaseOrderId,
        },
      } as React.ChangeEvent<{ name: string; value: any }>);
    }
    if (purchaseOrderId) {
      fetch(`/api/purchase-order/${purchaseOrderId}`)
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
            purchaseDeliveryItem: rows,
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
            purchaseDeliveryItem: rows,
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
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Tarih: {new Date(formData?.date).toLocaleDateString("tr-TR")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Personel ID: {formData?.personnel?.firstName}{" "}
                {formData?.personnel?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Açıklama: {formData?.description}
              </Typography>
            </Grid>
          </Grid>
          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Teslimat No: {formData?.deliveryNo}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
            <Typography variant="body1" gutterBottom>
              Navlun Türü: {formData?.freightType}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="body1" gutterBottom>
              Teslimat Türü: {formData?.deliveryType}
            </Typography>
          </Grid>

          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Nakliye Şirketi ID: {formData?.shippingCompany?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Nakliye Taşıyıcı ID: {formData?.shippingCarrier?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Nakliye Araç ID: {formData?.shippingCar?.plate}
              </Typography>
            </Grid>
          </Grid>
          <Divider
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                KM: {formData?.km}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                KM Fiyatı: {formData?.kmPrice}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body1" gutterBottom>
                Maliyet: {formData?.cost}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TableCell>
                <Typography variant="h6" gutterBottom>
                  Toplam Maliyet:{" "}
                  {(formData?.km || 0) * (formData?.kmPrice || 0) +
                    (formData?.cost || 0)}{" "}
                  TL
                </Typography>
              </TableCell>
            </Grid>
          </Grid>
          <Tabs
            value={tab}
            onChange={(event: React.SyntheticEvent, value: number) =>
              setTab(value)
            }
          >
            <Tab value={1} label="Satın Alma Navlun Kalemleri" />
            <Tab value={0} label="Satın Alma Sipariş Detayları" />
          </Tabs>
          <Grid container spacing={1}>
            {tab === 0 ? (
              <>
                <Grid item xs={12} md={12}>
                  <Alert severity="info">
                    <Typography variant="body1" gutterBottom>
                      Satın Alma Siparişi
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Talep No: {request?.id}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Tedarikçi: {request?.supplier?.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Sipariş Tarihi:{" "}
                      {new Date(request?.createdAt).toLocaleDateString("tr-TR")}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Personel: {request?.personnel?.firstName}{" "}
                      {request?.personnel?.lastName}
                    </Typography>
                  </Alert>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Sheet
                    refresh={refresh}
                    subRows={request?.purchaseOrderItem}
                  />
                </Grid>
              </>
            ) : tab === 1 ? (
              <Grid item xs={12} md={12}>
                <OrderSheet
                  refresh={refresh}
                  subRows={subRows}
                  setSubRows={setSubRows}
                  purchaseOrderId={Number(
                    purchaseOrderId || formData?.purchaseOrderId
                  )}
                />
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default Page;
