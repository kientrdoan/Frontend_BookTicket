import React, { useEffect, useState } from 'react'

export default function PaymentResult() {
    const [invoiceId, setInvoiceId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const invoiceIdFromUrl = searchParams.get("invoiceId");
    const statusFromUrl = searchParams.get("status");

    setInvoiceId(invoiceIdFromUrl);
    setStatus(statusFromUrl);
  }, []);

  return (
    <div className="pt-[150px] text-center h-[79vh]">
      <h2 className="text-2xl font-bold mb-2">Payment Result</h2>
      <h4 className="text-lg">Invoice ID: {invoiceId}</h4>
      <h4 className="text-lg text-red-500">Status: {status}</h4>
    </div>
  );
}

