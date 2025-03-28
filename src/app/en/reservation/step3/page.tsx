'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Step1Data {
  pickupLocation: string
  dropoffLocation: string
  adults: number
  children: number
  currency: string
  price: number
}

interface Step2Data {
  vehicleId: number
  vehicleName: string
  vehiclePrice: number
  transferPrice: number
  selectedExtras: { name: string; price: number }[]
  totalPrice: number
}

interface PersonalInfo {
  firstName: string
  lastName: string
  phone: string
  notes: string
  meetingDate: string
  meetingTime: string
  pickupAddress: string
  dropoffAddress: string
}

export default function Step3Page() {
  const router = useRouter()
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    notes: '',
    meetingDate: '',
    meetingTime: '',
    pickupAddress: '',
    dropoffAddress: ''
  })
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const savedStep1 = localStorage.getItem('reservationStep1')
    const savedStep2 = localStorage.getItem('reservationStep2')
    
    if (savedStep1 && savedStep2) {
      setStep1Data(JSON.parse(savedStep1))
      setStep2Data(JSON.parse(savedStep2))
    }
    setLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!step1Data || !step2Data) return;

    // Form validasyonu
    const newErrors: Record<string, boolean> = {}

    if (!personalInfo.firstName) newErrors.firstName = true
    if (!personalInfo.lastName) newErrors.lastName = true
    if (!personalInfo.meetingDate) newErrors.meetingDate = true
    if (!personalInfo.meetingTime) newErrors.meetingTime = true
    if (!personalInfo.pickupAddress) newErrors.pickupAddress = true
    if (!personalInfo.dropoffAddress) newErrors.dropoffAddress = true

    setErrors(newErrors)

    // Hata yoksa devam et
    if (Object.keys(newErrors).length === 0) {
      const message = `*New Transfer Reservation*%0A
----------------------------------------%0A
*Personal Information*%0A
First Name: ${personalInfo.firstName}%0A
Last Name: ${personalInfo.lastName}%0A
Phone: ${personalInfo.phone || 'Not provided'}%0A
----------------------------------------%0A
*Flight Information*%0A
Flight Date: ${personalInfo.meetingDate}%0A
Flight Time: ${personalInfo.meetingTime}%0A
Flight Code: ${personalInfo.pickupAddress}%0A
Destination: ${personalInfo.dropoffAddress}%0A
----------------------------------------%0A
*Transfer Details*%0A
From: ${step1Data.pickupLocation}%0A
To: ${step1Data.dropoffLocation}%0A
Passengers: ${step1Data.adults + step1Data.children} people%0A
Transfer Price: ${step2Data.transferPrice}$%0A
----------------------------------------%0A
*Selected Vehicle*%0A
${step2Data.vehicleName}%0A
Vehicle Price: ${step2Data.vehiclePrice}$%0A
${step2Data.selectedExtras.length > 0 ? `
*Selected Extra Services*%0A${step2Data.selectedExtras.map(extra => `${extra.name}: ${extra.price}$`).join('%0A')}%0A` : ''}
----------------------------------------%0A
*Total Amount: ${step2Data.totalPrice}$*%0A
----------------------------------------%0A
*Notes*%0A
${personalInfo.notes || 'No notes'}%0A`

      const whatsappUrl = `https://wa.me/905528988899?text=${message}`

      localStorage.removeItem('reservationStep1')
      localStorage.removeItem('reservationStep2')

      window.open(whatsappUrl, '_blank')
      router.push('/en')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center text-white">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!step1Data || !step2Data) {
    router.push('/en/reservation')
    return null
  }

  const inputClasses = "w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
  const labelClasses = "block text-sm font-medium text-gray-400 mb-1"
  const errorClasses = "border-red-500"

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Personal Information */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">Personal Information</h2>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className={labelClasses}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className={`${inputClasses} ${errors.firstName ? errorClasses : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className={`${inputClasses} ${errors.lastName ? errorClasses : ''}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className={inputClasses}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Arrival Transfer Information */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">Arrival Transfer Information</h2>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className={labelClasses}>
                      Flight Arrival Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={personalInfo.meetingDate}
                        onChange={(e) => setPersonalInfo({...personalInfo, meetingDate: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.meetingDate ? errorClasses : ''}`}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-calendar"></i>
                      </span>
                    </div>
                    {errors.meetingDate && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Flight Arrival Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        value={personalInfo.meetingTime}
                        onChange={(e) => setPersonalInfo({...personalInfo, meetingTime: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.meetingTime ? errorClasses : ''}`}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-clock"></i>
                      </span>
                    </div>
                    {errors.meetingTime && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Flight Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={personalInfo.pickupAddress}
                        onChange={(e) => setPersonalInfo({...personalInfo, pickupAddress: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.pickupAddress ? errorClasses : ''}`}
                        placeholder="EX: QX0707"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-plane"></i>
                      </span>
                    </div>
                    {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Where You Want To Go <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={personalInfo.dropoffAddress}
                        onChange={(e) => setPersonalInfo({...personalInfo, dropoffAddress: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.dropoffAddress ? errorClasses : ''}`}
                        placeholder="Location / Hotel"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    {errors.dropoffAddress && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                  </div>
                </form>
              </div>
            </div>

            {/* Reservation Summary */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">Reservation Summary</h2>
                
                {/* Vehicle Image */}
                <div className="mb-6">
                  <img
                    src="/images/vehicles/vito.jpg"
                    alt={step2Data?.vehicleName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Vehicle Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-yellow-500">
                      <i className="fas fa-car"></i>
                    </span>
                    <span className="ml-2 text-white">{step2Data?.vehicleName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span className="ml-2 text-white">{step1Data?.pickupLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span className="ml-2 text-white">{step1Data?.dropoffLocation}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">
                      <i className="fas fa-users"></i>
                    </span>
                    <span className="ml-2 text-white">{step1Data?.adults + step1Data?.children} Passengers</span>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">One Way Transfer</span>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Transfer Price</p>
                      <p className="text-lg font-semibold text-red-500">${step2Data?.transferPrice}</p>
                    </div>
                  </div>
                  {step2Data?.selectedExtras.length > 0 && (
                    <div className="mb-2">
                      <span className="text-gray-400">Extras:</span>
                      {step2Data.selectedExtras.map((extra, idx) => (
                        <div key={idx} className="flex justify-between items-center mt-1">
                          <span className="text-gray-400">{extra.name}</span>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Extra Service Price</p>
                            <p className="text-lg font-semibold text-red-500">${extra.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                    <span className="text-lg font-semibold text-white">Total Price:</span>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Vehicle Price</p>
                      <p className="text-lg font-semibold text-red-500">${step2Data?.vehiclePrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Total Price</p>
                      <p className="text-lg font-semibold text-red-500">${step2Data?.totalPrice}</p>
                    </div>
                  </div>
                </div>

                {/* Terms and Complete Button */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1"
                    />
                    <label className="ml-2 text-sm text-gray-400">
                      I have read and accept the <a href="#" className="text-yellow-500">Privacy and Security Policy</a>, <a href="#" className="text-yellow-500">Cancellation and Refund Conditions</a>
                    </label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  >
                    Pay Cash in Vehicle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 