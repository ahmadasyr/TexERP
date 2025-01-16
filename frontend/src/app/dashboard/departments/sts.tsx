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
  filterType: string;
}
export default function Sts({ year, startDate, endDate, filterType }: Props) {
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
  }, [startDate, endDate]);

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
    const counts: Record<string, number> = {}; // Use a map to track counts for each year-month combination
    items.forEach((item) => {
      const date = new Date((item as Record<string, any>)[dateField]);
      const year = date.getFullYear();
      const month = date.getMonth(); // 0 = January, 11 = December

      if (filterType === "date") {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (date >= start && date <= end) {
          const key = `${year}-${month}`;
          counts[key] = (counts[key] || 0) + 1;
        }
      } else if (
        filterType === "year" &&
        year === parseInt(year.toString(), 10)
      ) {
        const key = `${year}-${month}`;
        counts[key] = (counts[key] || 0) + 1;
      }
    });

    return counts;
  };

  const getFilteredLabelsAndCounts = (
    counts: Record<string, number>,
    start: Date,
    end: Date
  ) => {
    const filteredLabels: string[] = [];
    const filteredCounts: number[] = [];

    for (
      let date = new Date(start);
      date <= end;
      date.setMonth(date.getMonth() + 1)
    ) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      filteredLabels.push(
        `${new Date(year, month).toLocaleString("tr-TR", {
          month: "long",
        })} ${year}`
      );
      filteredCounts.push(counts[key] || 0);
    }

    return { filteredLabels, filteredCounts };
  };

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
    const referenceEnd =
      filterType === "year" ? new Date(year, 11, 31) : new Date(endDate);
    const last30DaysStart = new Date(
      referenceEnd.getTime() - 30 * 24 * 60 * 60 * 1000
    );
    const previous30DaysStart = new Date(
      referenceEnd.getTime() - 60 * 24 * 60 * 60 * 1000
    );

    const last30DaysCount = items.filter(
      (item) =>
        new Date(item.createdAt) >= last30DaysStart &&
        new Date(item.createdAt) <= referenceEnd
    ).length;

    const previous30DaysCount = items.filter(
      (item) =>
        new Date(item.createdAt) >= previous30DaysStart &&
        new Date(item.createdAt) < last30DaysStart
    ).length;

    return { last30DaysCount, previous30DaysCount };
  };

  const [plannedMeetCount, setPlannedMeetCount] = useState<number[]>([]);
  const [realMeetCount, setRealMeetCount] = useState<number[]>([]);
  const [offerCounts, setOfferCounts] = useState<number[]>([]);
  const [orderCounts, setOrderCounts] = useState<number[]>([]);
  const [orderLabels, setOrderLabels] = useState<string[]>([]);
  const [complaintCounts, setComplaintCounts] = useState<number[]>([]);
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
    const start = new Date(startDate);
    const end = new Date(endDate);

    const ordersCounts = getMonthlyCounts(orders, "createdAt");
    const complaintsCounts = getMonthlyCounts(complaints, "date");
    const meetingsPlanned = getMonthlyCounts(meetings, "plannedDate");
    const meetingsReal = getMonthlyCounts(meetings, "realDate");

    const { filteredLabels: orderLabels, filteredCounts: orderData } =
      getFilteredLabelsAndCounts(ordersCounts, start, end);
    const { filteredLabels: complaintLabels, filteredCounts: complaintData } =
      getFilteredLabelsAndCounts(complaintsCounts, start, end);

    setOrderCounts(orderData);
    setOrderLabels(orderLabels);
    setComplaintCounts(complaintData);
    setPlannedMeetCount(Object.values(meetingsPlanned));
    setRealMeetCount(Object.values(meetingsReal));
  }, [year, startDate, endDate, filterType, orders, complaints, meetings]);

  const [last30DaysOrders, setLast30DaysOrders] = useState(0);
  const [previous30DaysOrders, setPrevious30DaysOrders] = useState(0);

  useEffect(() => {
    const { last30DaysCount, previous30DaysCount } =
      calculateLast30DaysCounts(orders);
    setLast30DaysOrders(last30DaysCount);
    setPrevious30DaysOrders(previous30DaysCount);
  }, [year, startDate, endDate, orders]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate monthly counts for planned and real meetings
    const plannedMeetingCounts = calculateMonthlyCounts(
      meetings,
      "plannedDate"
    );
    const realMeetingCounts = calculateMonthlyCounts(meetings, "realDate");

    // Generate filtered labels and counts for the line chart
    const { labels: meetingLabels, filteredCounts: plannedCounts } =
      generateFilteredLabelsAndCounts(plannedMeetingCounts);
    const { filteredCounts: realCounts } =
      generateFilteredLabelsAndCounts(realMeetingCounts);

    setPlannedMeetCount(plannedCounts);
    setRealMeetCount(realCounts);
  }, [meetings, startDate, endDate, filterType]);

  const ordersPercentageDifference = calculatePercentageDifference(
    last30DaysOrders,
    previous30DaysOrders
  );

  const calculateMonthlyCounts = (items: any[], dateField: string) => {
    const counts = Array(12).fill(0);
    items.forEach((item) => {
      const date = new Date(item[dateField]);
      if (date >= new Date(startDate) && date <= new Date(endDate)) {
        counts[date.getMonth()]++;
      }
    });
    return counts;
  };

  const generateFilteredLabelsAndCounts = (counts: number[]) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const labels = [];
    const filteredCounts = [];

    for (
      let date = start;
      date <= end;
      date = new Date(date.setMonth(date.getMonth() + 1))
    ) {
      labels.push(date.toLocaleString("tr-TR", { month: "long" }));
      filteredCounts.push(counts[date.getMonth()]);
    }

    return { labels, filteredCounts };
  };

  // Process data for charts
  const orderMonthlyCounts = calculateMonthlyCounts(orders, "createdAt");
  const { labels: orderLabelsFinal, filteredCounts: orderCountsFinal } =
    generateFilteredLabelsAndCounts(orderMonthlyCounts);

  const complaintMonthlyCounts = calculateMonthlyCounts(complaints, "date");
  const { filteredCounts: complaintCountsFinal } =
    generateFilteredLabelsAndCounts(complaintMonthlyCounts);

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
                  labels: orderLabels,
                  datasets: [
                    {
                      label: "Planlanan Ziyaretler",
                      data: plannedMeetCount,
                      backgroundColor: "rgba(255,206,86,0.5)",
                      borderColor: "rgba(255,206,86,1)",
                      fill: true,
                    },
                    {
                      label: "Gerçekleşen Ziyaretler",
                      data: realMeetCount,
                      backgroundColor: "rgba(54,162,235,0.5)",
                      borderColor: "rgba(54,162,235,1)",
                      fill: true,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: { title: { display: true, text: "Aylar" } },
                    y: { title: { display: true, text: "Ziyaret Sayısı" } },
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
                labels: orderLabels,
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
                labels: orderLabels,
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
                  labels: orderLabels,
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
