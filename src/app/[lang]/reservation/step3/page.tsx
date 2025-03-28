'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { translations } from '@/translations'
import { useReservationStore } from '@/store/reservationStore'

type Language = 'en' | 'de' | 'ru' | 'tr'

interface PageProps {
  params: {
    lang: Language
  }
}

export default function ReservationStep3({ params }: PageProps) {
  const router = useRouter()
  const t = translations[params.lang]
  const { step3Data, setStep3Data, setCurrentStep } = useReservationStore()
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validasyonu
    const newErrors: Record<string, boolean> = {}

    if (!step3Data.name) newErrors.name = true
    if (!step3Data.surname) newErrors.surname = true
    if (!step3Data.email) newErrors.email = true
    if (!step3Data.phone) newErrors.phone = true
    if (!step3Data.flightNumber) newErrors.flightNumber = true
    if (!step3Data.pickupTime) newErrors.pickupTime = true
    if (!step3Data.paymentMethod) newErrors.paymentMethod = true

    setErrors(newErrors)

    // Hata yoksa devam et
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(4)
      router.push(`/${params.lang}/reservation/step4`)
    }
  }

  const inputClasses = "w-full px-4 py-2 bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
  const labelClasses = "block text-sm font-medium text-gray-300 mb-1"
  const errorClasses = "border-red-500"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">{t.personalInfo}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="relative">
            <label className={labelClasses}>
              {t.name} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={step3Data.name}
              onChange={(e) => setStep3Data({...step3Data, name: e.target.value})}
              className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.surname} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={step3Data.surname}
              onChange={(e) => setStep3Data({...step3Data, surname: e.target.value})}
              className={`${inputClasses} ${errors.surname ? errorClasses : ''}`}
            />
            {errors.surname && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={step3Data.email}
              onChange={(e) => setStep3Data({...step3Data, email: e.target.value})}
              className={`${inputClasses} ${errors.email ? errorClasses : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.phone} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={step3Data.phone}
              onChange={(e) => setStep3Data({...step3Data, phone: e.target.value})}
              className={`${inputClasses} ${errors.phone ? errorClasses : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.flightNumber} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={step3Data.flightNumber}
              onChange={(e) => setStep3Data({...step3Data, flightNumber: e.target.value})}
              className={`${inputClasses} ${errors.flightNumber ? errorClasses : ''}`}
            />
            {errors.flightNumber && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.pickupTime} <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={step3Data.pickupTime}
              onChange={(e) => setStep3Data({...step3Data, pickupTime: e.target.value})}
              className={`${inputClasses} ${errors.pickupTime ? errorClasses : ''}`}
            />
            {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.paymentMethod} <span className="text-red-500">*</span>
            </label>
            <select
              value={step3Data.paymentMethod}
              onChange={(e) => setStep3Data({...step3Data, paymentMethod: e.target.value})}
              className={`${inputClasses} ${errors.paymentMethod ? errorClasses : ''}`}
            >
              <option value="" disabled>{t.select}</option>
              <option value="cash">{t.cash}</option>
              <option value="creditCard">{t.creditCard}</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.notes}
            </label>
            <textarea
              value={step3Data.notes}
              onChange={(e) => setStep3Data({...step3Data, notes: e.target.value})}
              className={inputClasses}
              rows={3}
            />
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(2)
                router.push(`/${params.lang}/reservation/step2`)
              }}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t.back}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t.next}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 