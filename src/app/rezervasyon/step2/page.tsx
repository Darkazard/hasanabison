'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VehicleSelect from '@/components/Vehicle/VehicleSelect'
import { translations } from '@/translations'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
  tripType: 'one-way' | 'round-trip'
}

interface Vehicle {
  id: number
  name: string
  price: number
  image: string
}

export default function Step2Page() {
  const router = useRouter()
  const t = translations.tr
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedData = localStorage.getItem('reservationStep1')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setStep1Data(parsedData)
    }
    setLoading(false)
  }, [])

  const handleVehicleSelect = (data: {
    vehicleId: number | null;
    extras: number[];
    vehiclePrice: number;
    vehicleName: string;
    selectedExtras: { name: string; price: number }[];
    vehicleImage: string;
    tripType: 'one-way' | 'round-trip';
  }) => {
    if (data.vehicleId && step1Data) {
      const extrasTotal = data.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
      
      // Calculate vehicle total based on trip type
      let vehicleTotal;
      if (step1Data.tripType === 'round-trip') {
        vehicleTotal = ((step1Data.price + data.vehiclePrice) * 2) - 5 + extrasTotal;
      } else {
        vehicleTotal = step1Data.price + data.vehiclePrice + extrasTotal;
      }

      const step2Data = {
        ...data,
        transferPrice: step1Data.price,
        totalPrice: vehicleTotal,
        vehicleImage: data.vehicleImage,
        tripType: data.tripType
      };
      localStorage.setItem('reservationStep2', JSON.stringify(step2Data));
      router.push('/rezervasyon/step3');
    }
  };

  const handleTripTypeChange = (tripType: 'one-way' | 'round-trip') => {
    if (step1Data) {
      setStep1Data({ ...step1Data, tripType });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-white">{t.loading}</div>
          </div>
        </div>
      </div>
    )
  }

  if (!step1Data) {
    router.push('/reservation')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] 2xl:max-w-[80vw] mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{t.selectVehicle}</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{t.step2}</span>
          </div>
        </div>

        <VehicleSelect
          onVehicleSelect={handleVehicleSelect}
          initialPrice={step1Data.price}
          onTripTypeChange={handleTripTypeChange}
        />
      </div>
    </div>
  )
} 