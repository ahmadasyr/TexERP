"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/tr"; // Import Turkish locale
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Set up moment.js localizer
moment.locale("tr"); // Set locale to Turkish
const localizer = momentLocalizer(moment);

// Wrap the calendar with drag and drop functionality
const DnDCalendar = withDragAndDrop(Calendar);

// Define types for event data
interface Event {
  id?: number;
  start: Date;
  end: Date;
  title: string;
}

const App: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/customer-meet-plan");
      const data = await response.json();
      setPlans(data);
      setEvents(
        data.map((plan: any) => ({
          id: plan.id,
          start: new Date(plan.plannedDate),
          end: new Date(plan.plannedDate),
          title: plan.visitReason,
        }))
      );
    };
    fetchData();
  }, []);

  const onEventResize = useCallback(
    (data: { start: Date; end: Date; event: any }) => {
      const { start, end, event } = data;
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.title === event.title ? { ...e, start, end } : e
        )
      );
    },
    []
  );

  const onEventDrop = useCallback(
    (data: { start: Date; end: Date; event: any }) => {
      const { start, end, event } = data;
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.title === event.title ? { ...e, start, end } : e
        )
      );
    },
    []
  );

  const [open, setOpen] = useState(false);
  const [popupEvent, setPopupEvent] = useState<any>({});

  const views = useMemo(
    () => ({
      month: true,
      week: true,
      day: true,
      agenda: true,
    }),
    []
  );

  return (
    <div style={{ padding: "2rem", width: "100%" }}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          style={{
            padding: "1rem",
            borderRadius: "1rem",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" color="primary">
            {popupEvent.visitReason}
          </Typography>
          <Typography variant="h5" color="secondary">
            {moment(popupEvent.plannedDate).format("LLL")}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
            <strong>Müşteri:</strong> {popupEvent.customer?.name}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
            <strong>Ülke:</strong> {popupEvent?.country}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
            <strong>Ziyareti Gerçekleştiren Personel:</strong>{" "}
            {popupEvent.visitingPersonnel?.firstName}{" "}
            {popupEvent.visitingPersonnel?.lastName}
          </Typography>

          <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
            <strong>Gerçekleşen Ziyaret Tarihi:</strong>{" "}
            {popupEvent.realDate
              ? moment(popupEvent.realDate).format("LLL")
              : "Henüz gerçekleşmedi"}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
            <strong>Ziyaret Sonucu:</strong>{" "}
            {popupEvent.result || "Belirtilmedi"}
          </Typography>
          <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
            <strong>Ziyaret Gerçekleşme Oranı:</strong>{" "}
            {popupEvent.accuracyRate || "Belirtilmedi"}
          </Typography>
          <Box style={{ textAlign: "center", marginTop: "20px" }}>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Kapat
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: 8 }}
              onClick={() => {
                router.push(`/customer-meet-plan/form/?id=${popupEvent.id}`);
              }}
            >
              Düzenle
              <Edit />
            </Button>
          </Box>
        </Paper>
      </Modal>

      <Button
        variant="contained"
        onClick={() => {
          router.push("/customer-meet-plan/form");
        }}
        style={{ marginBottom: "8px" }}
      >
        Yeni Ziyaret Planı Ekle
      </Button>

      <Calendar
        defaultDate={moment().toDate()}
        defaultView="month" // Or Views.MONTH
        onDoubleClickEvent={(event: any) => {
          setOpen(true);
          setPopupEvent(plans.find((plan) => plan.id === event?.id));
        }}
        events={events}
        localizer={localizer}
        style={{ maxHeight: "100vh", height: "100vh" }}
        views={views} // Correctly formatted views object
        messages={{
          today: "Bugün",
          previous: "Geri",
          next: "İleri",
          month: "Ay",
          week: "Hafta",
          day: "Gün",
          agenda: "Ajanda",
          date: "Tarih",
          time: "Zaman",
          event: "Etkinlik",
          noEventsInRange: "Bu aralıkta etkinlik yok.",
          showMore: (total) => `+${total} daha fazla`,
        }}
      />
    </div>
  );
};

export default App;
