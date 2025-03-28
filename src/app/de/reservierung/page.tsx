"use client";
import ReservationForm from "@/components/Reservation/ReservationForm";

export default function ReservationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <ReservationForm showExtras={false} />
        </div>
      </div>
    </div>
  );
} 