"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
interface personnel {
  firstName: string;
  lastName: string;
}
interface DOFIData {
  reason: string;
  fromPersonnel: personnel;
  followedPersonnel: personnel;
  toPersonnel: personnel;
  date: string;
  nonconformityDescription: string;
  plannedCorrectiveActions: string;
  correctiveActionPlanner: string;
  dueDate: string;
  followUpClosureDetails: string;
  resultsAndComments: string;
  followedBy: string;
  closureDate: string;
  revisionInfo: string;
  createdAt: string;
}

const DOFIDocument: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = React.useState<DOFIData>({} as DOFIData);
  useEffect(() => {
    if (id) {
      fetch(`/api/dof/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [id]);
  const {
    reason,
    fromPersonnel,
    followedPersonnel,
    toPersonnel,
    date,
    nonconformityDescription,
    plannedCorrectiveActions,
    correctiveActionPlanner,
    dueDate,
    followUpClosureDetails,
    resultsAndComments,
    followedBy,
    closureDate,
    revisionInfo,
    createdAt,
  } = data;
  const handlePrint = () => {
    const printContent = document.getElementById("printable-section");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(
        "<html><head><title>Yazdır</title></head><body>"
      );
      printWindow?.document.write(printContent.innerHTML);
      printWindow?.document.write("</body></html>");
      printWindow?.document.close();
      printWindow?.print();
    }
  };
  return (
    <>
      <div style={{ textAlign: "left", marginTop: "20px" }}>
        <button
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            margin: "20px 0",
            backgroundColor: "#F05A29",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Yazdır
        </button>
      </div>
      <div
        id="printable-section"
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
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <p>
            <strong>DÖF nedeni:</strong>
          </p>
          <p>
            <span>
              <strong>Tedarikçi</strong>: {reason === "Tedarikçi" ? "✓" : "☐"}
            </span>
            <span style={{ marginLeft: "20px" }}>
              <strong>Müşteri</strong>: {reason === "Müşteri" ? "✓" : "☐"}
            </span>
            <span style={{ marginLeft: "20px" }}>
              <strong>İç Tetkik</strong>: {reason === "İç Tetkik" ? "✓" : "☐"}
            </span>
            <span style={{ marginLeft: "20px" }}>
              <strong>Diğer</strong>: {reason === "Diğer" ? "✓" : "☐"}
            </span>
          </p>
        </div>

        {/* Sender and Receiver Section */}
        <div
          style={{
            marginTop: "10px",
            borderBottom: "1px solid #000",
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>
            <strong>Kimden:</strong> {fromPersonnel?.firstName}{" "}
            {fromPersonnel?.lastName}
          </p>
          <p>
            <strong>Kime:</strong> {toPersonnel?.firstName}{" "}
            {toPersonnel?.lastName}
          </p>
          <p>
            <strong>Tarih:</strong> {date?.split("T")[0]}
          </p>
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
          <p>{nonconformityDescription}</p>
          <p>
            <strong>Uygunsuzluğu Bildirenin İmzası:</strong>
          </p>
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
          <p>{plannedCorrectiveActions}</p>
          <p>
            <span>
              <strong>Düzeltici Faaliyeti Planlayan:</strong>{" "}
              {correctiveActionPlanner}
            </span>
            <span style={{ float: "right" }}>
              <strong>Termin Tarihi:</strong> {dueDate?.split("T")[0]}
            </span>
          </p>
        </div>

        {/* Follow-up and Closure Section */}
        <div style={{ marginTop: "10px", paddingBottom: "10px" }}>
          <p>
            <strong>Düzeltici Faaliyetin Takibi ve Kapatılması:</strong>
          </p>
          <p>
            <strong>Sonuç ve Açıklamalar:</strong>
          </p>
          <p>{resultsAndComments}</p>
          <p>
            <span>
              <strong>Takip Eden/Kapatan:</strong>{" "}
              {followedPersonnel?.firstName} {followedPersonnel?.lastName}
            </span>
            <span style={{ float: "right" }}>
              <strong>İmza:</strong> <strong>Tarih:</strong>{" "}
              {closureDate?.split("T")[0]}
            </span>
          </p>
        </div>

        {/* Revision Info Section */}
        <div
          style={{
            marginTop: "10px",
            paddingBottom: "10px",
            float: "right",
          }}
        >
          <p>
            <span>
              <em>FR-İYS-017/{id}</em> {"  "}
              <em>
                <strong>Rev.Tar:</strong> {createdAt?.split("T")[0]}
              </em>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DOFIDocument;
