import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import CountUp from "react-countup";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { backgroundColors1 } from "../colors";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface Customer {
  status: string;
  city: string;
}

interface Order {
  createdAt: string;
  orderItem: {
    product: {
      name: string;
    };
  }[];
}

interface Complaint {
  date: string;
  result: string;
  product: {
    name: string;
  };
}

interface Meeting {
  plannedDate: string;
  realDate: string;
}

interface Offer {
  offerDate: string;
  status: string; // "Verilecek", "Red", "Onaylandi", "Beklemede"
}

function randomizeArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}
interface Props {
  year: number;
  startDate: string;
  endDate: string;
}
export default function Sts({ year, startDate, endDate }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/order")
        .then((res) => res.json())
        .then((data) => setOrders(data));
      await fetch("/api/customer")
        .then((res) => res.json())
        .then((data) => setCustomers(data));
      await fetch("/api/customer-complaint")
        .then((res) => res.json())
        .then((data) => setComplaints(data));
      await fetch("/api/customer-meet-plan")
        .then((res) => res.json())
        .then((data) => setMeetings(data));
      await fetch("/api/offer")
        .then((res) => res.json())
        .then((data) => setOffers(data));
    };
    getData();
  }, []);

  const getMonthlyCounts = (
    items: {
      date?: string;
      createdAt?: string;
      plannedDate?: string;
      realDate?: string;
      offerDate?: string;
    }[],
    dateField: string
  ) => {
    const counts = Array(12).fill(0);
    items.forEach((item) => {
      const date = new Date((item as Record<string, any>)[dateField]);
      const month = date.getMonth(); // 0 = January, 11 = December
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (date >= start && date <= end) {
          counts[month]++;
        }
      } else if (date.getFullYear() === year) {
        counts[month]++;
      }
    });
    return counts;
  };

  const [orderCounts, setOrderCounts] = useState<number[]>([]);
  const [complaintCounts, setComplaintCounts] = useState<number[]>([]);
  const [plannedMeetCount, setPlannedMeetCount] = useState<number[]>([]);
  const [realMeetCount, setRealMeetCount] = useState<number[]>([]);
  const [offerCounts, setOfferCounts] = useState<number[]>([]);
  // count cities per customer
  const customerPerCity = customers.reduce((acc, c) => {
    acc[c.city] = (acc[c.city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedCustomerPerCity = Object.entries(customerPerCity)
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, number>);
  const complaintPerProduct = complaints.reduce((acc, c) => {
    acc[c.product.name] = (acc[c.product.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const orderPerProduct = orders.reduce((acc, o) => {
    o.orderItem.forEach((oi) => {
      acc[oi.product.name] = (acc[oi.product.name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    setOrderCounts(getMonthlyCounts(orders, "createdAt"));
    setComplaintCounts(getMonthlyCounts(complaints, "date"));
    setPlannedMeetCount(getMonthlyCounts(meetings, "plannedDate"));
    setRealMeetCount(getMonthlyCounts(meetings, "realDate"));
    setOfferCounts(getMonthlyCounts(offers, "offerDate"));
  }, [year, startDate, endDate]);

  const [last30DaysOrders, setLast30DaysOrders] = useState(0);
  const [previous30DaysOrders, setPrevious30DaysOrders] = useState(0);
  const calculatePercentageDifference = (
    currentCount: number,
    previousCount: number
  ): number => {
    if (previousCount === 0) {
      return currentCount > 0 ? 100 : 0;
    }
    return ((currentCount - previousCount) / previousCount) * 100;
  };

  const calculateLast30DaysCounts = (items: { createdAt: string }[]) => {
    const end = new Date(endDate);
    const last30DaysStart = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    const previous30DaysStart = new Date(
      end.getTime() - 60 * 24 * 60 * 60 * 1000
    );

    const last30DaysCount = items.filter(
      (item) =>
        new Date(item.createdAt) >= last30DaysStart &&
        new Date(item.createdAt) <= end
    ).length;

    const previous30DaysCount = items.filter(
      (item) =>
        new Date(item.createdAt) >= previous30DaysStart &&
        new Date(item.createdAt) < last30DaysStart
    ).length;

    return { last30DaysCount, previous30DaysCount };
  };

  useEffect(() => {
    const { last30DaysCount, previous30DaysCount } =
      calculateLast30DaysCounts(orders);
    setLast30DaysOrders(last30DaysCount);
    setPrevious30DaysOrders(previous30DaysCount);
  }, [year, startDate, endDate]);

  const ordersPercentageDifference = calculatePercentageDifference(
    last30DaysOrders,
    previous30DaysOrders
  );

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: { xs: 2, sm: 3 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            {/* Bar Chart Section */}
            <Grid item xs={12} md={8}>
              <Typography variant="h3" gutterBottom>
                Şehir Bazında Müşteriler
              </Typography>
              <Divider />
              <Bar
                data={{
                  labels: Object.keys(sortedCustomerPerCity),
                  datasets: [
                    {
                      label: "Müşteri Sayısı",
                      data: Object.values(sortedCustomerPerCity),
                      backgroundColor: randomizeArray(backgroundColors1),
                    },
                  ],
                }}
              />
            </Grid>

            {/* KPIs and Complaints Section */}
            <Grid item xs={12} md={4}>
              <Typography variant="h3" gutterBottom>
                Müşteriler
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                {["Mevcut", "Potansiyel", "Riskli", "Kara Liste"].map(
                  (status) => (
                    <Grid item xs={6} key={status}>
                      <Typography variant="h6">{status}</Typography>
                      <Typography variant="h3">
                        <CountUp
                          start={0}
                          end={
                            customers.filter((c) => c.status === status).length
                          }
                          duration={1.5}
                          separator=","
                        />
                      </Typography>
                    </Grid>
                  )
                )}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h3" gutterBottom>
                Müşteri Ziyaretleri
              </Typography>
              <Divider />
              <Line
                data={{
                  labels: [
                    "Ocak",
                    "Şubat",
                    "Mart",
                    "Nisan",
                    "Mayıs",
                    "Haziran",
                    "Temmuz",
                    "Ağustos",
                    "Eylül",
                    "Ekim",
                    "Kasım",
                    "Aralık",
                  ],
                  datasets: [
                    {
                      label: "Planlanan",
                      data: plannedMeetCount,
                      backgroundColor: "rgba(255,206,86,0.5)",
                      borderColor: "rgba(255,206,86,1)",
                    },
                    {
                      label: "Gerçekleşen",
                      data: realMeetCount,
                      backgroundColor: "rgba(54,162,235,0.5)",
                      borderColor: "rgba(54,162,235,1)",
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Paper
        sx={{
          padding: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          marginTop: 2,
          maxWidth: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {" "}
            {/* offer count per status */}
            <Typography variant="h3" gutterBottom>
              Teklif Durumları
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              {["Verilecek", "Red", "Onaylandi", "Beklemede"].map((status) => (
                <Grid item xs={12} sm={6} key={status}>
                  <Typography variant="h6">{status}</Typography>
                  <Typography variant="h3">
                    <CountUp
                      start={0}
                      end={offers.filter((o) => o.status === status).length}
                      duration={1.5}
                      separator=","
                    />
                  </Typography>
                </Grid>
              ))}
            </Grid>
            {/* Offers Line Chart */}
            <Typography variant="h3" gutterBottom>
              Teklifler
            </Typography>
            <Divider />
            <Line
              data={{
                labels: [
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık",
                ],
                datasets: [
                  {
                    label: "Teklifler",
                    data: offerCounts,
                    backgroundColor: "rgba(153,102,255,0.5)",
                    borderColor: "rgba(153,102,255,1)",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h3" gutterBottom>
                Ürün Bazında Siparişler
              </Typography>
              <Divider />
              <Doughnut
                data={{
                  labels: Object.keys(orderPerProduct),
                  datasets: [
                    {
                      label: "Siparişler",
                      data: Object.values(orderPerProduct),
                      backgroundColor: randomizeArray(backgroundColors1),
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h3" gutterBottom>
                Siparişler
              </Typography>
              {ordersPercentageDifference > 0 ? (
                <span
                  style={{
                    color: "green",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowDropUp />
                  {ordersPercentageDifference.toFixed(2)}%
                </span>
              ) : (
                <span
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowDropDown />
                  {ordersPercentageDifference.toFixed(2)}%
                </span>
              )}
            </Box>
            <Divider />
            <Line
              data={{
                labels: [
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık",
                ],
                datasets: [
                  {
                    label: "Siparişler",
                    data: orderCounts,
                    backgroundColor: "rgba(75,192,192,0.5)",
                    borderColor: "rgba(75,192,192,1)",
                  },
                ],
              }}
              options={{
                responsive: true,

                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
            <CountUp start={0} end={orderCounts.reduce((a, b) => a + b, 0)} />
          </Grid>
        </Grid>
      </Paper>
      <Paper
        sx={{
          padding: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          marginTop: 2,
          maxWidth: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            {/* Complaints count */}

            <Typography variant="h3" gutterBottom>
              Şikayetler
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Açık Şikayetler</Typography>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={complaints.filter((c) => !c.result).length}
                    duration={1.5}
                    separator=","
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Kapalı Şikayetler</Typography>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={complaints.filter((c) => c.result).length}
                    duration={1.5}
                    separator=","
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Toplam Şikayetler</Typography>
                <Typography variant="h3">
                  <CountUp
                    start={0}
                    end={complaints.length}
                    duration={1.5}
                    separator=","
                  />
                </Typography>
              </Grid>
              <Line
                data={{
                  labels: [
                    "Ocak",
                    "Şubat",
                    "Mart",
                    "Nisan",
                    "Mayıs",
                    "Haziran",
                    "Temmuz",
                    "Ağustos",
                    "Eylül",
                    "Ekim",
                    "Kasım",
                    "Aralık",
                  ],
                  datasets: [
                    {
                      label: "Şikayetler",
                      data: complaintCounts,
                      backgroundColor: "rgba(255,99,132,0.5)",
                      borderColor: "rgba(255,99,132,1)",
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Bar chart for complaints per product and orders per product */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h3" gutterBottom>
              Ürün Bazında Şikayetler
            </Typography>
            <Divider />
            <Doughnut
              data={{
                labels: Object.keys(complaintPerProduct),
                datasets: [
                  {
                    label: "Şikayetler",
                    data: Object.values(complaintPerProduct),
                    backgroundColor: randomizeArray(backgroundColors1),
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
