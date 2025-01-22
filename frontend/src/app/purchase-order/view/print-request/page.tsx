"use client";
import { Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Receipt = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = React.useState<any>({
    id: null,
    createdAt: null,
    personnelId: null,
    supplierId: null,
    purchaseRequestId: null,
    purchaseType: null,
    vade: null,
    shippingType: null,
    deadline: null,
    personnel: {
      firstName: null,
      lastName: null,
      department: null,
    },
    supplier: {
      id: null,
      name: null,
      accountId: null,
      materials: null,
      foreign: null,
      suitable: null,
      supplierScore: null,
      approved: null,
      evaluationDate: null,
      createdAt: null,
      entryScore: null,
      maxApprovalDate: null,
      contractType: null,
      contractDate: null,
      contractValidityPeriod: null,
      selfPickup: null,
      address: null,
      phone: null,
      email: null,
      authorizedPerson: null,
      authorizedPersonPhone: null,
      authorizedPersonEmail: null,
      taxOfficeId: null,
      taxNumber: null,
      vade: null,
      iso9001Status: null,
      iso14001Status: null,
      iso45001Status: null,
    },
    purchaseRequest: {
      id: null,
      createdAt: null,
      department: null,
      personnelId: null,
      approvalFromSupervisor: null,
      approvalFromSupervisorDate: null,
      approvalFromPurchasing: null,
      approvalFromPurchasingDate: null,
      approvalFromManagement: null,
      approvalFromManagementDate: null,
      personnel: {
        firstName: null,
        lastName: null,
        department: null,
      },
      purchaseRequestItem: [],
    },
    purchaseOrderItem: [],
  });
  useEffect(() => {
    if (id) {
      fetch(`/api/purchase-order/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [id]);
  return (
    data && (
      <>
        <style jsx>{`
          .receipt-container {
            font-family: Arial, sans-serif;
            margin: 20px;
            border: 1px solid #ddd;
            padding: 20px;
            background-color: #fff;
          }
          .receipt-table {
            width: 90%;
            border-collapse: collapse;
            margin: auto;
          }
          .receipt-table th,
          .receipt-table td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          .receipt-table th {
            background-color: #f4f4f4;
            font-weight: bold;
          }
          .print-button {
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            font-size: 16px;
          }
          .print-button:hover {
            background-color: #0056b3;
          }
        `}</style>
        <Button
          className="print-button"
          variant="contained"
          size="large"
          sx={{
            marginTop: 2,
            marginBottom: 2,
            marginX: "auto",
            width: "100%",
            maxWidth: 200,
            display: "block",
          }}
          onClick={(e) => {
            e.preventDefault();
            window.print();
          }}
        >
          Yazdır
        </Button>
        <table id="printable-section" className="receipt-table">
          <thead>
            <tr>
              <th colSpan={5} rowSpan={2}>
                <img
                  src="/logo.png"
                  style={{
                    width: "100%",
                    maxWidth: 200,
                  }}
                  alt="Dokumaş Fabric"
                />
              </th>
              <th colSpan={9} rowSpan={3}>
                TEKLİF İSTEM FORMU
              </th>
              <th rowSpan={2}>TALEP NO</th>
              <th rowSpan={2}>:</th>
              <th rowSpan={2}>{data.id}</th>
            </tr>
            <tr></tr>
            <tr>
              <th colSpan={5}>
                Rev.Tar. : {new Date().toLocaleDateString("tr-TR")}
              </th>
              <th>TALEP TARİHİ</th>
              <th>:</th>
              <th>{new Date(data.createdAt).toLocaleDateString()}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} rowSpan={2}>
                DOKUMAŞ FABRİC TEKSTİL SANAYİ VE TİCARET LİMİTED ŞİRKETİ
              </td>
              <td colSpan={10}>Tedarikçi Bilgileri</td>
            </tr>
            <tr>
              <td colSpan={2}>Tedarikçi Adı</td>
              <td>:</td>
              <td colSpan={7}>{data.supplier?.name}</td>
            </tr>
            <tr>
              <td colSpan={2} rowSpan={2}>
                Adres
              </td>
              <td rowSpan={2}>:</td>
              <td colSpan={4} rowSpan={2}>
                BURSA - OSMANGAZİ
              </td>
              <td colSpan={2} rowSpan={2}>
                Adres
              </td>
              <td rowSpan={2}>:</td>
              <td colSpan={4} rowSpan={2}>
                {data.supplier?.address}
              </td>
              <td>Vergi Dairesi</td>
              <td>:</td>
              <td>{data.supplier?.taxOffice?.name}</td>
            </tr>
            <tr>
              <td>Vergi Kimlik No</td>
              <td>:</td>
              <td>{data?.supplier?.taxNumber}</td>
            </tr>
            <tr>
              <td colSpan={2}>E-posta</td>
              <td>:</td>
              <td colSpan={4}>info@dokumasfabric.com</td>
              <td colSpan={2}>E-posta</td>
              <td>:</td>
              <td colSpan={2}>{data?.supplier?.email}</td>
              <td colSpan={5}>Kaşe / İmza</td>
            </tr>
            <tr>
              <td colSpan={2}>Merkez Tel</td>
              <td>:</td>
              <td colSpan={4}>(224) 503 97 27</td>
              <td colSpan={2}>Telefon</td>
              <td>:</td>
              <td colSpan={2}>{data?.supplier?.phone}</td>
              <td colSpan={5} rowSpan={4}></td>
            </tr>
            <tr>
              <td colSpan={2}>Yetkili Kişi</td>
              <td>:</td>
              <td colSpan={4}>
                {data?.personnel?.firstName} {data?.personnel?.lastName}
              </td>
              <td colSpan={2}>Yetkili Kişi</td>
              <td>:</td>
              <td colSpan={2}>{data?.supplier?.authorizedPerson}</td>
            </tr>
            <tr>
              <td colSpan={2}>Telefon</td>
              <td>:</td>
              <td colSpan={4}>{data?.personnel?.phone}</td>
              <td colSpan={2}>Yetkili Tel</td>
              <td>:</td>
              <td colSpan={2}>{data.supplier.authorizedPersonPhone}</td>
            </tr>
            <tr>
              <td colSpan={2}>E-posta</td>
              <td>:</td>
              <td colSpan={4}>{data?.personnel?.email}</td>
              <td colSpan={2}>Yetkili E-posta</td>
              <td>:</td>
              <td colSpan={2}>{data.supplier.authorizedPersonEmail}</td>
            </tr>
            <tr>
              <td colSpan={10}>
                Not: Teklifinizin döviz cinsinden verilmesi durumunda kur,
                Merkez Bankası Döviz Satış Kuru üzerinden hesaplanacaktır.
              </td>
            </tr>
            <tr>
              <td>No</td>
              <td colSpan={5}>Malzeme / Hizmet Adı</td>
              <td colSpan={2}>Miktar</td>
              <td colSpan={2}>Anlaşılan Birim Fiyat</td>
              <td>Ödeme Şekli</td>
              <td>Vade (gün)</td>
              <td>Ambalaj Şekli</td>
              <td colSpan={2}>Teslimat Şekli</td>
              <td>Menşei</td>
            </tr>
            {data.purchaseOrderItem.map(
              (
                item: {
                  id: React.Key | null | undefined;
                  material: {
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  };
                  quantity:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  unit:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  pricePerUnit:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  currency: {
                    code:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  };
                  packagingType: {
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | null
                      | undefined;
                  };
                },
                index: number
              ) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td colSpan={5}>{item.material.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td></td>
                  <td></td>
                  <td>{data.purchaseType}</td>
                  <td>{data.vade}</td>
                  <td>{item.packagingType.name}</td>
                  <td colSpan={2}></td>
                  <td>{data.supplier.foreign ? "Yurt Dışı" : "TR"}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </>
    )
  );
};

export default Receipt;
