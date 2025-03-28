'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Vehicle {
  id: number
  name: string
  description: string
  images: string[]
  passengerCapacity: string
  luggageCapacity: string
  features: string[]
  extraFeatures: string[]
  price: number
  isPopular?: boolean
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Ekonomik VIP",
    description: "Geniş iç hacim deri koltuklar ve özel iç tasarım.",
    images: [
      "/vehicles/ekonomik1.jpg",
      "/vehicles/ekonomik2.jpg",
      "/vehicles/ekonomik3.jpg",
      "/vehicles/ekonomik4.jpg",
      "/vehicles/ekonomik5.jpg"
    ],
    passengerCapacity: "1-5",
    luggageCapacity: "1-5",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BsssUZDOLAP",
      "Bebek koltuk",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 25
  },
  {
    id: 2,
    name: "Premium VIP (Ultra Lüx)",
    description: "⭐ VIP Deneyimin Zirvesi - En Çok Tercih Edilen ⭐ Lüks, konfor ve prestijin mükemmel uyumu. Özel şoför ve premium hizmet garantisi.",
    images: [
      "/vehicles/premium1.jpg",
      "/vehicles/premium2.jpg",
      "/vehicles/premium3.jpg",
      "/vehicles/premium4.jpg",
      "/vehicles/premium5.jpg"
    ],
    passengerCapacity: "12",
    luggageCapacity: "12",
    features: [
      "✨ Premium Hizmetler Dahil",
      "📱 Yüksek Hızlı WiFi & 4K TV",
      "❄️ Özel Mini Bar & Buzdolabı",
      "👶 Lüks Bebek Koltuğu",
      "🥂 Premium İçecek İkramları",
      "💺 Masajlı VIP Koltuklar",
      "🎯 VIP Karşılama ve İsim Tabelası",
      "💎 %100 Müşteri Memnuniyeti",
      "🏆 En Çok Tercih Edilen Seçenek",
      "⭐ Premium Müşteri Desteği"
    ],
    extraFeatures: [],
    price: 35,
    isPopular: true
  },
  {
    id: 3,
    name: "Business VIP",
    description: "İş seyahatleri için özel tasarlanmış konfor.",
    images: [
      "/vehicles/business1.jpg",
      "/vehicles/business2.jpg",
      "/vehicles/business3.jpg",
      "/vehicles/business4.jpg",
      "/vehicles/business5.jpg"
    ],
    passengerCapacity: "1-3",
    luggageCapacity: "1-3",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "Çalışma Masası",
      "SU Ücretsiz",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 30
  },
  {
    id: 4,
    name: "Aile VIP",
    description: "Geniş aileler için ideal seçim.",
    images: [
      "/vehicles/family1.jpg",
      "/vehicles/family2.jpg",
      "/vehicles/family3.jpg",
      "/vehicles/family4.jpg",
      "/vehicles/family5.jpg"
    ],
    passengerCapacity: "6-8",
    luggageCapacity: "6-8",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "2 Bebek koltuğu",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 40
  },
  {
    id: 5,
    name: "Luxury VIP",
    description: "En üst düzey konfor ve lüks deneyim.",
    images: [
      "/vehicles/luxury1.jpg",
      "/vehicles/luxury2.jpg",
      "/vehicles/luxury3.jpg",
      "/vehicles/luxury4.jpg",
      "/vehicles/luxury5.jpg"
    ],
    passengerCapacity: "1-4",
    luggageCapacity: "1-4",
    features: [
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "Masaj Koltuğu",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
    price: 45
  }
]

export default function VehicleList() {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)

  // Resim navigasyonu
  const nextImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: (prev[vehicleId] + 1) % maxLength || 0
    }))
  }

  const prevImage = (vehicleId: number, maxLength: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [vehicleId]: prev[vehicleId] === 0 ? maxLength - 1 : (prev[vehicleId] - 1) || 0
    }))
  }

  const getCurrentImageIndex = (vehicleId: number) => {
    return currentImageIndices[vehicleId] || 0
  }

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 p-4">
      {vehicles.map((vehicle) => {
        const currentImageIndex = getCurrentImageIndex(vehicle.id)

        return (
          <div
            key={vehicle.id}
            onClick={() => handleVehicleSelect(vehicle)}
            className={`relative group cursor-pointer transition-all duration-300 ${
              vehicle.id === 2 ? 'bg-gradient-to-br from-[#0f172a] to-[#1a237e] border-blue-400/30' : 'bg-black/80 border-gray-800'
            } backdrop-blur-sm rounded-xl p-4 border ${
              selectedVehicle?.id === vehicle.id
                ? vehicle.id === 2
                  ? 'scale-[1.02] shadow-2xl shadow-blue-500/20 border-blue-400'
                  : 'scale-[1.02] shadow-xl shadow-red-500/20 border-red-500'
                : vehicle.id === 2
                ? 'hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400'
                : 'hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/20 hover:border-red-500'
            }`}
          >
            {vehicle.id === 2 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-1 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30">
                👑 En Çok Tercih Edilen 👑
              </div>
            )}
            <div className="grid grid-cols-12 gap-6">
              {/* Araç Görseli */}
              <div className={`${vehicle.id === 2 ? 'col-span-5' : 'col-span-3'} relative h-40`} onClick={e => e.stopPropagation()}>
                <div className="absolute inset-0 flex items-center justify-between z-10">
                  <button 
                    onClick={() => prevImage(vehicle.id, vehicle.images.length)} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={() => nextImage(vehicle.id, vehicle.images.length)} 
                    className="w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    ›
                  </button>
                </div>
                <div className="relative h-full w-full">
                  <Image
                    src={vehicle.images[currentImageIndex]}
                    alt={vehicle.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {vehicle.images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndices(prev => ({ ...prev, [vehicle.id]: idx }))}
                    />
                  ))}
                </div>
              </div>

              {/* Özellikler */}
              <div className={`${vehicle.id === 2 ? 'col-span-7' : 'col-span-9'} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-lg font-bold ${
                    vehicle.id === 2
                      ? 'text-blue-400 group-hover:text-blue-300'
                      : 'text-red-400'
                  }`}>
                    {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <p className={`text-xl font-bold ${
                      vehicle.id === 2
                        ? 'text-blue-400 group-hover:text-blue-300'
                        : 'text-white group-hover:text-gray-200'
                    }`}>
                      {vehicle.price}
                    </p>
                    <span className="text-sm text-gray-400">/kişi</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3">{vehicle.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Yolcu:</span>
                    <p className="font-medium">{vehicle.passengerCapacity}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Bavul:</span>
                    <p className="font-medium">{vehicle.luggageCapacity}</p>
                  </div>
                </div>

                {vehicle.id === 2 ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {vehicle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <div className="text-sm text-gray-400 mb-2">Araç Özellikleri:</div>
                      <div className="space-y-1 text-sm">
                        {vehicle.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300 truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-2">Ekstra Özellikler:</div>
                      <div className="space-y-1 text-sm">
                        {vehicle.extraFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300 truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 