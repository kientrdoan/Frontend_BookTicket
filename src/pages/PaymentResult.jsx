import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className='pt-[150px] text-center h-[79vh]'>
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>Payment Result!</h2>

      <p className='text-sm text-gray-500 mb-4'>
        Invoice ID: <span className='font-medium'>{invoiceId}</span>
      </p>

      <p
        className={`text-sm mb-6 font-semibold ${
          status === "success" ? "text-green-600" : "text-red-600"
        }`}
      >
        Status: {status}
      </p>
      <div className='space-y-2'>
        <Link
          to='/profile'
          className='block text-blue-500 hover:underline font-medium'
        >
          View Booking History
        </Link>
        <Link
          to='/'
          className='block text-blue-500 hover:underline font-medium'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
