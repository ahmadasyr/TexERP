"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
const BankViewPage: React.FC = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  return (
    <div>
      <h1>Bank View Page</h1>
      <p>Welcome to the bank view page.</p>
      <p>Viewing bank with ID: {id}</p>
    </div>
  );
};

export default BankViewPage;
