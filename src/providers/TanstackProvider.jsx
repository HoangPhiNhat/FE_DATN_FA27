"use client";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const TanstackProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default TanstackProvider;
