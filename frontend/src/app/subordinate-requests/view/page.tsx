"use client";
import { title } from "../request";
import React, { useEffect } from "react";
import departments from "../../profile/departments.json";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Modal,
  Paper,
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
import { useRouter, useSearchParams } from "next/navigation";
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
  const isManagement = getPersonnelInfo().department === "yon";
  const [alertValue, setAlertValue] = React.useState<number>(0);
  const [popup, setPopup] = React.useState<any>({
    on: false,
    table: "",
    column: "",
  });
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [fetchRefresh, setFetchRefresh] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<any>({});
  useEffect(() => {
    if (id && !popupHandler) {
      fetch(`/api/purchase-request/personnel-request/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSubRows(data.purchaseOrderItem || []);
          setRequest(data);
          setFormData(data.purchaseOrder[0]);
          setRefresh(!refresh);
        });
    }
  }, [id, fetchRefresh]);

  const [request, setRequest] = React.useState<any>({});

  const [total, setTotal] = React.useState<number>(0);
  const [subRows, setSubRows] = React.useState<any[]>([]);
  const [tab, setTab] = React.useState<number>(
    formData && formData.status ? 1 : 0
  );
  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch("/api/currency");
      const data = await response.json();
      const price = subRows.reduce(
        (sum, row) =>
          sum +
          row.quantity *
            row.pricePerUnit *
            (1 + row.vat / 100) *
            data.find((c: { id: any }) => c.id === row.currencyId)?.rate,
        0
      );
      setTotal(price);
    };
    fetchCurrencies();
  }, [subRows]);
  const router = useRouter();
  const colors = [
    { value: "Pending", color: "warning" },
    { value: "Approved", color: "info" },
    { value: "Rejected", color: "error" },
    { value: "Cancelled", color: "warning" },
    { value: "Completed", color: "success" },
    { value: "Returned", color: "error" },
  ];
  const options = [
    { value: "Pending", label: "Beklemede" },
    { value: "Approved", label: "Onaylandı" },
    { value: "Rejected", label: "Reddedildi" },
    { value: "Cancelled", label: "İptal Edildi" },
    { value: "Completed", label: "Tamamlandı" },
    { value: "Returned", label: "İade Edildi" },
  ];
  return (
    <>
      <Paper
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
      >
        <Box width={"100%"}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          {/* go to view/print-request/?id= */}
          {tab === 1 && formData?.status ? (
            <>
              <Alert
                sx={{
                  marginBottom: 2,
                }}
                severity={
                  colors.find((c) => c.value === formData?.status)?.color as
                    | "warning"
                    | "info"
                    | "error"
                    | "success"
                }
              >
                Durum:{" "}
                {options.find((o) => o.value === formData?.status)?.label}
              </Alert>
              <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                  <Typography variant="body1">
                    Tarih:{" "}
                    <b>{new Date(formData.createdAt).toLocaleDateString()}</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="body1">
                    Personel:{" "}
                    <b>
                      {formData?.personnel?.firstName}{" "}
                      {formData?.personnel?.lastName}
                    </b>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Typography variant="body1">
                    İstenen Termin: {"  "}
                    <b>
                      {new Date(formData.deadline).toLocaleDateString("tr-TR")}
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            ""
          )}
          {tab === 0 && (
            <>
              <Alert
                severity={
                  request.approvalFromSupervisor === true
                    ? "success"
                    : request.approvalFromSupervisor === false
                    ? "error"
                    : "warning"
                }
              >
                Bölüm Müdürü Tarafından{" "}
                {request.approvalFromSupervisor
                  ? `${new Date(
                      request.approvalFromSupervisorDate
                    ).toLocaleDateString("tr-TR")} Tarihinde  `
                  : ""}
                {request.approvalFromSupervisor === true
                  ? "Onaylandı"
                  : request.approvalFromSupervisor === false
                  ? "Reddedildi"
                  : "Beklemede"}
              </Alert>
              <Divider
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              />
              <Alert
                severity={
                  request.approvalFromPurchasing === true
                    ? "success"
                    : request.approvalFromPurchasing === false
                    ? "error"
                    : "warning"
                }
              >
                Satın Alma Birimi Tarafından{" "}
                {request.approvalFromPurchasing
                  ? `${new Date(
                      request.approvalFromPurchasingDate
                    ).toLocaleDateString("tr-TR")} Tarihinde  `
                  : ""}
                {request.approvalFromPurchasing === true
                  ? "Onaylandı"
                  : request.approvalFromPurchasing === false
                  ? "Reddedildi"
                  : "Beklemede"}
              </Alert>{" "}
              {request.approvalFromPurchasing === null && (
                <Box display="flex" justifyContent="flex-end" my={2}>
                  {request.approvalFromSupervisor === null ||
                  request.approvalFromSupervisor === false ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        fetch(`/api/purchase-request/supervisor/true/` + id, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });
                        setFetchRefresh(!fetchRefresh);
                      }}
                    >
                      Onayla
                    </Button>
                  ) : (
                    ""
                  )}
                  {request.approvalFromSupervisor === null ||
                  request.approvalFromSupervisor === true ? (
                    <Button
                      variant="contained"
                      color="error"
                      size="large"
                      sx={{ ml: 2 }}
                      onClick={() => {
                        fetch(`/api/purchase-request/supervisor/false/` + id, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });
                        setFetchRefresh(!fetchRefresh);
                      }}
                    >
                      Reddet
                    </Button>
                  ) : (
                    ""
                  )}
                </Box>
              )}
            </>
          )}

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
                    subRows={request?.purchaseRequestItem || []}
                  />
                </Grid>
              </>
            ) : tab === 1 ? (
              <Grid
                item
                xs={12}
                md={12}
                style={{
                  height: "max-content",
                }}
              >
                <OrderSheet
                  refresh={refresh}
                  subRows={formData?.purchaseOrderItem || []}
                />{" "}
              </Grid>
            ) : null}
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default Page;
