"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Typography,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import { useFormData } from "@/components/form/utils";
import { FormModal } from "@/components/form/modal";
import Popup from "@/components/form/Popup";
import { Data, formFields, tableName, title } from "../sent";
import { NewNumber, NewRelation } from "@/components/form/FormFields";

interface Props {
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
}

interface PopupState {
  on: boolean;
  table: string;
  column: string;
}

interface OrderItems {
  yarnTypeId: number;
  yarnOrderItem: any;
  id: number;
  sentCount: number;
  sentKg: number;
  yarnOrderShipmentId: number;
  name: string;
  lot: string;
  yarnStock: any[];
}

const useFetchData = (id: string | null, handleChange: any) => {
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await fetch(`/api/${tableName}/${id}`);
          const data = await response.json();
          Object.keys(data).forEach((key) =>
            handleChange({
              target: { name: key, value: data[key] },
            } as React.ChangeEvent<{ name: string; value: any }>)
          );
        } catch (error) {}
      })();
    }
  }, [id, handleChange]);
};

const Bank: React.FC = ({ popupHandler, popupSetter }: Props) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { formData, handleChange, tableData, runFetchData } =
    useFormData<Data>(formFields);

  const [alertValue, setAlertValue] = useState<number>(0);
  const [popup, setPopup] = useState<PopupState>({
    on: false,
    table: "",
    column: "",
  });
  const [shipments, setShipments] = useState<any[]>([]);
  const [orderedItems, setOrderedItems] = useState<OrderItems[]>([]);
  const [yarnOrderShipmentId, setYarnOrderShipmentId] = useState<number | null>(
    null
  );

  useFetchData(id, handleChange);

  useEffect(() => {
    const shipmentData = tableData.find(
      (data) => data.name === "yarn-order-shipment"
    );
    if (shipmentData) {
      setShipments(shipmentData.values.filter((value: any) => !value.closed));
    }
  }, [tableData]);

  useEffect(() => {
    if (yarnOrderShipmentId === null) return;
    const selectedShipment = shipments.find(
      (shipment) => shipment.id === yarnOrderShipmentId
    );
    if (selectedShipment) {
      setOrderedItems(
        selectedShipment.yarnOrderShipmentItem.map(
          (item: OrderItems, index: number) => ({
            id: item.id || index,
            sentCount: item.sentCount,
            sentKg: item.sentKg,
            yarnOrderShipmentId: item.yarnOrderShipmentId,
            name: item?.yarnOrderItem.yarnType.name,
            lot: item?.yarnOrderItem.lot,
            yarnTypeId: item?.yarnOrderItem.yarnTypeId,
            yarnStock: item?.yarnOrderItem.yarnType.yarnStock,
          })
        )
      );
    }
  }, [yarnOrderShipmentId, shipments]);

  const [yarnTypeId, setYarnTypeId] = useState<number | null>(null);
  const [yarnStock, setYarnStock] = useState<any[]>([]);

  const togglePopup = useCallback(
    (table: string, column: string) => {
      setPopup((prev) => ({ on: !prev.on, table, column }));
    },
    [setPopup]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = id ? `/api/${tableName}/${id}` : `/api/${tableName}`;
    const method = id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setAlertValue(200);
      popupHandler?.(data);
      popupSetter?.({ on: false, table: "" });
    } catch (error) {
      setAlertValue(500);
    }
  };

  const ShipmentTable = () => (
    <DataGrid
      rows={shipments.map((shipment, index) => ({
        ...shipment,
        id: shipment.id || index,
      }))}
      columns={[
        { field: "id", headerName: "İrsaliye No", width: 150 },
        {
          field: "account",
          headerName: "Hesap",
          width: 150,
          valueGetter: (params, row) => row?.yarnOrder?.account?.name || "",
        },
        {
          field: "closed",
          headerName: "Durum",
          width: 150,
          valueGetter: (params, row) => (row?.closed ? "Kapalı" : "Açık"),
        },
        {
          field: "actions",
          headerName: "İşlemler",
          width: 150,
          renderCell: (params) => (
            <Button onClick={() => setYarnOrderShipmentId(params.row.id)}>
              Seç
            </Button>
          ),
        },
      ]}
    />
  );

  const OrderedItemTable = () => (
    <DataGrid
      rows={orderedItems}
      columns={[
        { field: "id", headerName: "İrsaliye No", width: 150 },
        {
          field: "sentCount",
          headerName: "Gönderilecek Bobin Adet",
          width: 150,
        },
        { field: "sentKg", headerName: "Gönderilecek Kg", width: 150 },
        {
          field: "name",
          headerName: "İplik Tipi",
          width: 150,
        },
        {
          field: "lot",
          headerName: "Lot",
          width: 150,
        },
        {
          field: "yarnStock",
          headerName: "İplik Stok",
          width: 150,
          renderCell: (params) => (
            <Button
              onClick={() => {
                console.log(params.row.yarnStock);
                setYarnStock(params.row.yarnStock);
              }}
            >
              Seç
            </Button>
          ),
        },
      ]}
    />
  );
  const [stockId, setStockId] = useState<number | null>(null);
  const yarnStockColumns: GridColDef[] = [
    { field: "id", headerName: "İplik Stok No", width: 150 },
    { field: "lot", headerName: "Lot", width: 150 },
    { field: "netKg", headerName: "Kg", width: 150 },
    { field: "count", headerName: "Bobin Adet", width: 150 },
    {
      field: "actions",
      headerName: "İşlemler",
      width: 150,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setStockId(params.row.id);
          }}
        >
          Seç
        </Button>
      ),
    },
  ];
  const StockTable = () => (
    <DataGrid
      rows={yarnStock}
      columns={yarnStockColumns}
      getRowId={(row) => row?.id}
    />
  );
  let allProps = {
    formFields,
    formData,
    handleChange,
    tableData,
    togglePopup,
  };
  useEffect(() => {
    if (stockId === null) return;
    handleChange({
      target: { name: "yarnStockEntryId", value: stockId },
    } as React.ChangeEvent<{ name: string; value: any }>);
    handleChange({
      target: { name: "yarnOrderItemId", value: orderedItems[0]?.id },
    } as React.ChangeEvent<{ name: string; value: any }>);
    handleChange({
      target: { name: "yarnOrderShipmentId", value: yarnOrderShipmentId },
    } as React.ChangeEvent<{ name: string; value: any }>);
  }, [stockId]);
  return (
    <>
      <Popup
        open={popup.on}
        table={popup.table}
        togglePopup={togglePopup}
        popupHandler={(data) =>
          handleChange({
            target: { name: popup.column, value: data?.id },
          } as React.ChangeEvent<{ name: string; value: any }>)
        }
        popupSetter={setPopup}
      />
      <FormModal
        isPopup={!!popupHandler}
        alertValue={alertValue}
        setAlertValue={setAlertValue}
      />
      <form
        style={{
          margin: "5% auto",
          width: popupHandler ? "auto" : "90%",
          padding: popupHandler ? 0 : "5%",
          boxShadow: popupHandler ? "none" : "0 0 20px rgba(0,0,0,0.15)",
          borderRadius: popupHandler ? 0 : ".5rem",
        }}
        onSubmit={handleSubmit}
      >
        <Box width={"100%"}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          {id === null ? (
            <>
              <Box>
                {orderedItems.length === 0 ? (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      İrsaliye Seç
                    </Typography>
                    <ShipmentTable />
                  </Box>
                ) : yarnStock.length === 0 ? (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      İrsaliye Detayları
                    </Typography>
                    <OrderedItemTable />
                  </Box>
                ) : stockId === null ? (
                  <Box width="100%">
                    <Typography variant="h6" gutterBottom>
                      İplik Stok Seç
                    </Typography>
                    <StockTable />
                  </Box>
                ) : (
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                      <NewRelation
                        {...allProps}
                        keyProp="yarnOrderShipmentId"
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <NewRelation {...allProps} keyProp="yarnOrderItemId" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <NewRelation {...allProps} keyProp="yarnStockEntryId" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <NewNumber {...allProps} keyProp="sentKg" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <NewNumber {...allProps} keyProp="sentCount" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <NewRelation {...allProps} keyProp="personnelId" />
                    </Grid>
                  </Grid>
                )}
              </Box>
            </>
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="yarnOrderShipmentId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="yarnOrderItemId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="yarnStockEntryId" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewNumber {...allProps} keyProp="sentKg" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewNumber {...allProps} keyProp="sentCount" />
              </Grid>
              <Grid item xs={12} md={4}>
                <NewRelation {...allProps} keyProp="personnelId" />
              </Grid>
            </Grid>
          )}
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

export default Bank;
