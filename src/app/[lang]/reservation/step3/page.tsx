'use client'

import { useState, useEffect } from 'react'
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
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    flightNumber: '',
    pickupTime: '',
    paymentMethod: '',
    notes: ''
  })

  useEffect(() => {
    if (step3Data) {
      setFormData(step3Data)
    }
  }, [step3Data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validasyonu
    const newErrors: Record<string, boolean> = {}

    if (!formData.name) newErrors.name = true
    if (!formData.surname) newErrors.surname = true
    if (!formData.email) newErrors.email = true
    if (!formData.phone) newErrors.phone = true
    if (!formData.flightNumber) newErrors.flightNumber = true
    if (!formData.pickupTime) newErrors.pickupTime = true
    if (!formData.paymentMethod) newErrors.paymentMethod = true

    setErrors(newErrors)

    // Hata yoksa devam et
    if (Object.keys(newErrors).length === 0) {
      setStep3Data(formData)
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
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
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
              value={formData.surname}
              onChange={(e) => setFormData({...formData, surname: e.target.value})}
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
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
              value={formData.flightNumber}
              onChange={(e) => setFormData({...formData, flightNumber: e.target.value})}
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
              value={formData.pickupTime}
              onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
              className={`${inputClasses} ${errors.pickupTime ? errorClasses : ''}`}
            />
            {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
          </div>

          <div className="relative">
            <label className={labelClasses}>
              {t.paymentMethod} <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
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
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
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