'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DonationStatus() {
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);

  useEffect(() => {
    // Check for a 'success' query parameter in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get('success');

    if (success === '1' && !show) {
      setShow(true);
    }

    if (show && !showed) {
      toast.success('Thanks for your donation!');
      setShowed(true);
    }
  }, [show, showed]);

  return (
    <>
      {/* This component currently does not render anything visible, but you could add a status message or similar here if needed */}
    </>
  );
}