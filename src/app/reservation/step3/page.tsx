'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { translations } from '@/translations'

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
  const searchParams = useSearchParams()
  const t = translations.tr
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

  const calculatePrices = () => {
    if (!step1Data || !step2Data) return {
      basePrice: 0,
      vehiclePrice: 0,
      extrasTotal: 0,
      totalPrice: 0,
      isRoundTrip: false
    };

    // Güzergah fiyatı
    const basePrice = step1Data.price;
    
    // Araç fiyatı
    const vehiclePrice = step2Data.vehiclePrice;
    
    // Gidiş-dönüş kontrolü
    const isRoundTrip = searchParams.get('tripType') === 'round-trip';
    
    // Ek hizmetlerin toplamı
    const extrasTotal = step2Data.selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    
    // Toplam fiyat hesaplama
    let totalPrice = basePrice + vehiclePrice;
    
    // Gidiş-dönüş seçiliyse toplam fiyatı 2'ye çarp ve 5$ indirim uygula
    if (isRoundTrip) {
      totalPrice = (totalPrice * 2) - 5;
    }
    
    // Ekstra hizmetleri ekle
    totalPrice += extrasTotal;

    return {
      basePrice,
      vehiclePrice,
      extrasTotal,
      totalPrice,
      isRoundTrip
    };
  };

  const prices = calculatePrices();

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
      const message = `🚗 Transfer Rezervasyonu

👤 Kişisel Bilgiler:
Ad Soyad: ${personalInfo.firstName} ${personalInfo.lastName}
Telefon: ${personalInfo.phone || 'Belirtilmedi'}
Not: ${personalInfo.notes || 'Not eklenmedi'}
Kişi Sayısı: ${step1Data?.adults ?? 0} + ${step1Data?.children ?? 0}

✈️ Transfer Bilgileri:
${prices.isRoundTrip ? '🔄 Gidiş-Dönüş Transfer' : '➡️ Tek Yön Transfer'}
Varış Tarihi: ${personalInfo.meetingDate}
Varış Saati: ${personalInfo.meetingTime}
Uçuş Kodu: ${personalInfo.pickupAddress}
Gidilecek Yer: ${personalInfo.dropoffAddress}

💰 Fiyat Detayları:
Güzergah Ücreti: $${prices.basePrice}
Araç Ücreti: $${prices.vehiclePrice}
${prices.isRoundTrip ? 'Gidiş-Dönüş İndirimi: -$5\n' : ''}

🚘 Seçilen Araç: ${step2Data?.vehicleName ?? ''}

${step2Data?.selectedExtras.length > 0 ? `
🎁 Seçilen Ek Hizmetler:
${step2Data.selectedExtras.map(extra => `- ${extra.name}: $${extra.price}`).join('\n')}
Ek Hizmet Toplamı: $${prices.extrasTotal}
` : ''}

💵 Genel Toplam: $${prices.totalPrice}`

      const whatsappUrl = `https://wa.me/905528988899?text=${encodeURIComponent(message)}`

      localStorage.removeItem('reservationStep1')
      localStorage.removeItem('reservationStep2')

      window.open(whatsappUrl, '_blank')
      router.push('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center text-white">{t.loading}</div>
          </div>
        </div>
      </div>
    )
  }

  if (!step1Data || !step2Data) {
    router.push('/reservation')
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
            {/* Kişisel Bilgiler */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.personalInfo}</h2>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className={labelClasses}>
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      className={`${inputClasses} ${errors.firstName ? errorClasses : ''}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.surname} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      className={`${inputClasses} ${errors.lastName ? errorClasses : ''}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className={inputClasses}
                      placeholder={t.enterPhoneNumber}
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Varış Transfer Bilgileri */}
            <div className="md:col-span-1">
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.arrivalTransferInfo}</h2>
                <form className="space-y-4" noValidate>
                  <div>
                    <label className={labelClasses}>
                      {t.flightArrivalDate} <span className="text-red-500">*</span>
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
                    {errors.meetingDate && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.flightArrivalTime} <span className="text-red-500">*</span>
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
                    {errors.meetingTime && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.flightCode} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={personalInfo.pickupAddress}
                        onChange={(e) => setPersonalInfo({...personalInfo, pickupAddress: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.pickupAddress ? errorClasses : ''}`}
                        placeholder="Örnek: QX0707"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-plane"></i>
                      </span>
                    </div>
                    {errors.pickupAddress && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                  <div>
                    <label className={labelClasses}>
                      {t.whereYouWantToGo} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={personalInfo.dropoffAddress}
                        onChange={(e) => setPersonalInfo({...personalInfo, dropoffAddress: e.target.value})}
                        className={`${inputClasses} pl-10 ${errors.dropoffAddress ? errorClasses : ''}`}
                        placeholder={t.locationHotel}
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                    {errors.dropoffAddress && <p className="text-red-500 text-sm mt-1">{t.requiredField}</p>}
                  </div>
                </form>
              </div>
            </div>

            {/* Araç Detayları ve Fiyat Özeti */}
            <div className="md:col-span-1">
              {/* Araç Detayları */}
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.selectedVehicle}</h2>
                
                {/* Araç Resmi */}
                <div className="mb-6">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src="/images/vehicles/vito.jpg"
                      alt={step2Data?.vehicleName}
                      className="w-full h-full object-cover"
                    />
                    {prices.isRoundTrip && (
                      <div className="absolute top-3 right-3 bg-green-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                        {t.roundTrip}
                      </div>
                    )}
                  </div>
                </div>

                {/* Araç Detayları */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="ml-2 font-medium">{step2Data?.vehicleName}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="ml-2">{step1Data?.pickupLocation} → {step1Data?.dropoffLocation}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="ml-2">{step1Data?.adults + step1Data?.children} {t.passengers}</span>
                  </div>
                </div>
              </div>

              {/* Fiyat Özeti */}
              <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-white">{t.priceSummary}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>{t.routePrice}:</span>
                    <span className="font-medium">${prices.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>{t.vehiclePrice}:</span>
                    <span className="font-medium">${prices.vehiclePrice}</span>
                  </div>
                  {prices.isRoundTrip && (
                    <div className="flex justify-between items-center text-green-400">
                      <span>{t.roundTripDiscount}:</span>
                      <span className="font-medium">-$5</span>
                    </div>
                  )}
                  {prices.extrasTotal > 0 && (
                    <>
                      <div className="pt-2 border-t border-gray-700">
                        <div className="text-sm font-medium text-gray-400 mb-2">{t.selectedExtras}:</div>
                        {step2Data?.selectedExtras.map((extra, idx) => (
                          <div key={idx} className="flex justify-between items-center text-gray-300 text-sm">
                            <span>{extra.name}</span>
                            <span>+${extra.price}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center text-gray-300 mt-2 pt-2 border-t border-gray-700">
                          <span>{t.extrasTotal}:</span>
                          <span className="font-medium">+${prices.extrasTotal}</span>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="pt-4 mt-4 border-t-2 border-gray-700">
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-bold text-white">{t.totalPrice}:</span>
                      <span className="font-bold text-red-500">${prices.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25"
              >
                {t.bookWithWhatsApp}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 