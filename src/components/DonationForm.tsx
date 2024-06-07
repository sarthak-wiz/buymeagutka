'use client';
import { createDonation } from "@/actions/DonationActions";
import { faCoffee, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import QRCode from 'qrcode.react';

export default function DonationForm({ email }: { email: string }) {
  const [numberInValue, setNumberInValue] = useState('');
  const [amount, setAmount] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [upiId, setUpiId] = useState(''); // Replace setUpiId with an underscore if not used

  const handleSupportClick = () => {
    setShowModal(true); // Show the QR code when the button is clicked
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`/api/user-profile?email=${email}`);
        const profile = await response.json();
        if (profile && profile.upiId) {
          const upiIdPattern = /^[\w.-]+@[\w.-]+$/;
          if (upiIdPattern.test(profile.upiId)) {
            setUpiId(profile.upiId);
          } else {
            console.error("Invalid UPI ID format");
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    }
  
    fetchUserProfile();
  }, [email]);

  useEffect(() => {
    if (numberInValue) {
      const intValue = parseInt(numberInValue);
      if (intValue > 5 && intValue <= 1000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInValue]);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    const url = await createDonation(formData);
    if (url && window && window.location) {
      window.location.href = url;
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        <button
          type="button"
          onClick={() => { setAmount(1); setNumberInValue('1'); }}
          className={"amount " + (amount === 1 ? 'active' : '')}>
          1
        </button>
        <button
          type="button"
          onClick={() => { setAmount(3); setNumberInValue('3'); }}
          className={"amount " + (amount === 3 ? 'active' : '')}>
          3
        </button>
        <button
          type="button"
          onClick={() => { setAmount(5); setNumberInValue('5'); }}
          className={"amount " + (amount === 5 ? 'active' : '')}>
          5
        </button>
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          type="number"
          placeholder="10"
          onChange={ev => setNumberInValue(ev.target.value)}
          value={numberInValue} />
      </div>
      <div className="mt-2">
        <input name="name" type="text" placeholder="Your name" />
      </div>
      <div className="mt-2">
        <textarea name="message" placeholder="Say something nice"></textarea>
      </div>
      <div className="mt-2">
        <button
          type="button"
          onClick={handleSupportClick}
          className="bg-yellow-300 w-full rounded-xl px-2 py-2 font-semibold">
          Support ₹{amount * 5}
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg relative">
            <FontAwesomeIcon icon={faTimes} onClick={closeModal} className="absolute top-2 right-2 cursor-pointer text-gray-700" />
            {upiId && (
              <QRCode value={`upi://pay?pa=${upiId}&pn=ReceiverName&am=${amount * 5}&cu=INR`} className="mt-4" />
            )}
            {!upiId && <p>Loading UPI ID...</p>}
          </div>
        </div>
      )}
    </form>
  );
}
/*
async function getUserProfile(email: string) {
  // Replace with actual API call to fetch user profile
  const response = await fetch(`/api/user-profile?email=${email}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return await response.json();
}
*/