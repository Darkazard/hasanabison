'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { translations } from '@/translations'
import { useTripType } from '@/contexts/TripTypeContext'
import { IoArrowBack } from 'react-icons/io5'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
  tripType: 'one-way' | 'round-trip'
}

interface Step2Data {
  vehicleId: number
  extras: number[]
  vehiclePrice: number
  vehicleName: string
  selectedExtras: { name: string; price: number }[]
  vehicleImage: string
  tripType: 'one-way' | 'round-trip'
  totalPrice: number
  transferPrice: number
}

interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  flightNumber: string
  notes: string
  meetingDate: string
  meetingTime: string
  pickupAddress: string
}

const Step3Page = () => {
  const router = useRouter()
  const t = translations.tr
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    flightNumber: '',
    notes: '',
    meetingDate: '',
    meetingTime: '',
    pickupAddress: ''
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const savedStep1 = localStorage.getItem('reservationStep1')
    const savedStep2 = localStorage.getItem('reservationStep2')
    
    if (savedStep1 && savedStep2) {
      const step1ParsedData = JSON.parse(savedStep1)
      const step2ParsedData = JSON.parse(savedStep2)
      console.log('Step2 Data:', step2ParsedData) // Debug için
      setStep1Data(step1ParsedData)
      setStep2Data(step2ParsedData)
    } else {
      router.push('/rezervasyon/step1')
    }
    setLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!step1Data || !step2Data) {
      router.push('/rezervasyon/step1')
      return
    }
    
    const newErrors: Record<string, boolean> = {}
    if (!personalInfo.firstName) newErrors.firstName = true
    if (!personalInfo.lastName) newErrors.lastName = true
    if (!personalInfo.phone) newErrors.phone = true
    if (!personalInfo.flightNumber) newErrors.flightNumber = true
    if (!personalInfo.meetingDate) newErrors.meetingDate = true
    if (!personalInfo.meetingTime) newErrors.meetingTime = true
    if (!personalInfo.pickupAddress) newErrors.pickupAddress = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const message = `🚗 Yeni Transfer Rezervasyonu

👤 Kişisel Bilgiler:
Ad Soyad: ${personalInfo.firstName} ${personalInfo.lastName}
Telefon: ${personalInfo.phone}

✈️ Transfer Detayları:
Nereden: ${step1Data.pickupLocation}
Nereye: ${step1Data.dropoffLocation}
Yolcu Sayısı: ${step1Data.adults} Yetişkin${step1Data.children > 0 ? `, ${step1Data.children} Çocuk` : ''}
Transfer Tipi: ${step2Data.tripType === 'round-trip' ? 'Gidiş-Dönüş' : 'Tek Yön'}

📅 Varış Bilgileri:
Tarih: ${personalInfo.meetingDate}
Saat: ${personalInfo.meetingTime}
Uçuş No: ${personalInfo.flightNumber}
Adres: ${personalInfo.pickupAddress}

🚘 Seçilen Araç: ${step2Data.vehicleName}

${step2Data.selectedExtras.length > 0 ? `
🎁 Seçilen Ekstra Hizmetler:
${step2Data.selectedExtras.map(extra => `- ${extra.name}: ${extra.price}₺`).join('\n')}
` : ''}

💵 Toplam Tutar: ${step2Data.totalPrice}₺`

      const whatsappUrl = `https://wa.me/905528988899?text=${encodeURIComponent(message)}`

      localStorage.removeItem('reservationStep1')
      localStorage.removeItem('reservationStep2')

      window.open(whatsappUrl, '_blank')
      router.push('/')
    }
  }

  if (loading || !step1Data || !step2Data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="mb-6 text-gray-400 hover:text-white flex items-center gap-2"
          >
            <IoArrowBack className="w-5 h-5" />
            Geri
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kişisel Bilgiler */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">Kişisel Bilgiler</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Ad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.phone ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                      placeholder="Telefon numaranız"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Bilgileri */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">Transfer Bilgileri</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Uçuş Tarihi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="meetingDate"
                      value={personalInfo.meetingDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.meetingDate ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                    />
                    {errors.meetingDate && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Uçuş Saati <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="meetingTime"
                      value={personalInfo.meetingTime}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.meetingTime ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                    />
                    {errors.meetingTime && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Uçuş Numarası <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="flightNumber"
                      value={personalInfo.flightNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.flightNumber ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                      placeholder="Örnek: TK1234"
                    />
                    {errors.flightNumber && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Nereye Gideceksiniz? <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pickupAddress"
                      value={personalInfo.pickupAddress}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-900 border ${
                        errors.pickupAddress ? 'border-red-500' : 'border-gray-700'
                      } text-white rounded-lg focus:ring-2 focus:ring-red-500`}
                      placeholder="Konum / Otel"
                    />
                    {errors.pickupAddress && (
                      <p className="text-red-500 text-sm mt-1">Bu alan zorunludur</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Araç ve Fiyat Bilgileri */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Seçilen Araç</h2>
                <div className="space-y-4">
                  <img
                    src={step2Data.vehicleImage}
                    alt={step2Data.vehicleName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <span className="font-medium">Ekonomik</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span>Antalya Havalimanı → Lara</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <span>{step1Data.adults + step1Data.children} Yolcu</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Fiyat Özeti</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Transfer Ücreti:</span>
                    <span>{step2Data.transferPrice}₺</span>
                  </div>
                  {step2Data.selectedExtras && step2Data.selectedExtras.length > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Ekstra Hizmetler:</span>
                      <span>
                        {step2Data.selectedExtras.reduce((sum, extra) => sum + extra.price, 0)}₺
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-2xl font-bold mt-4">
                    <span className="text-white">Toplam:</span>
                    <span className="text-red-500">{step2Data.totalPrice}₺</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors mt-6"
              >
                WhatsApp ile Rezervasyon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Page 