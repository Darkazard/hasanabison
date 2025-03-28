'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VehicleSelect from '@/components/Vehicle/VehicleSelect'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
}

export default function Step2Page() {
  const router = useRouter()
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
  }) => {
    if (data.vehicleId && step1Data) {
      // Seçilen araç ve ek hizmet bilgilerini kaydet
      const extrasTotal = data.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
      const step2Data = {
        ...data,
        transferPrice: step1Data.price, // Transfer ücretini ekle
        totalPrice: step1Data.price + data.vehiclePrice + extrasTotal // Transfer + Araç + Ekstralar
      };
      localStorage.setItem('reservationStep2', JSON.stringify(step2Data));
      
      // 3. adıma geç
      router.push('/reservation/step3');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-white">Yükleniyor...</div>
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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Rezervasyon Detayları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-400">Nereden</p>
                <p className="text-lg text-white">{step1Data.pickupLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Nereye</p>
                <p className="text-lg text-white">{step1Data.dropoffLocation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Yolcu</p>
                <p className="text-lg text-white">{step1Data.adults + step1Data.children} Kişi</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Para Birimi</p>
                <p className="text-lg text-white">{step1Data.currency || '$'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Transfer Ücreti</p>
                <p className="text-lg font-semibold text-red-500">${step1Data.price}</p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-8">Araç Seçimi</h1>
          <VehicleSelect 
            onVehicleSelect={handleVehicleSelect}
            initialPrice={step1Data.price}
          />
        </div>
      </div>
    </div>
  )
} 