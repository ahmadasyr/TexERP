import request from "supertest";
import express from "express";
import customerRouter from "../src/routes/customerRoutes"; // Adjust the path if necessary

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use("/api/customer", customerRouter); // Mount the customer router

describe("Customer API", () => {
  let testCustomerId: number;

  // Create a test customer
  it("should create a new customer", async () => {
    const res = await request(app).post("/customers").send({
      name: "John Doe",
      foreign: false,
      relatedPerson: "Jane Doe",
      title: "CEO",
      email: "john.doe@example.com",
      phoneNumber: "123456789",
      firstOffer: "2024-01-01",
      salesPersonId: 1,
      firstRegisterDate: "2024-01-01",
      status: "Mevcut",
      returnDate: "2024-12-31",
      salesOpinion: "Good customer",
      creditNote: "None",
      shippingMethod: "Fabricadan",
      meterLimit: 100,
      address: "123 Main St",
      city: "Cityville",
      taxOfficeId: 1,
      taxNumber: "1234567890",
      paymentKind: "Credit",
      note: "Test customer",
      bankId: 1,
      currencyId: 1,
      iban: "GB33BUKB20201555555555",
      swift: "BUKBGB22",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    testCustomerId = res.body.id; // Store customer ID for later tests
  });

  // Fetch all customers
  it("should fetch all customers", async () => {
    const res = await request(app).get("/customers");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Fetch customer by ID
  it("should fetch a customer by ID", async () => {
    const res = await request(app).get(`/customers/${testCustomerId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", testCustomerId);
  });

  // Update a customer
  it("should update a customer", async () => {
    const res = await request(app).put(`/customers/${testCustomerId}`).send({
      name: "John Doe Updated",
      foreign: true,
      relatedPerson: "Jane Doe Updated",
      title: "Updated CEO",
      email: "john.updated@example.com",
      phoneNumber: "987654321",
      firstOffer: "2024-02-01",
      salesPersonId: 2,
      firstRegisterDate: "2024-02-01",
      status: "Mevcut",
      returnDate: "2024-11-30",
      salesOpinion: "Updated Opinion",
      creditNote: "Updated Credit Note",
      shippingMethod: "Fabricadan",
      meterLimit: 150,
      address: "Updated 123 Main St",
      city: "Updated Cityville",
      taxOfficeId: 2,
      taxNumber: "0987654321",
      paymentKind: "Cash",
      note: "Updated test customer",
      bankId: 2,
      currencyId: 2,
      iban: "GB33BUKB20201555555556",
      swift: "BUKBGB23",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John Doe Updated");
  });

  // Delete a customer
  it("should delete a customer by ID", async () => {
    const res = await request(app).delete(`/customers/${testCustomerId}`);
    expect(res.statusCode).toEqual(204);
  });

  // Fetch non-existing customer by ID
  it("should return 404 for non-existing customer", async () => {
    const res = await request(app).get(`/customers/${testCustomerId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "Customer not found");
  });
});
