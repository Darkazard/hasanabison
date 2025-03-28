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
      "Fiyata Dahilcc Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
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
    description: "Tatillinizin ilk fotoğrafını havalimanında çekmeye başlayın",
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
      "Fiyata Dahil Hizmetlerdir",
      "TV & WiFi & BUZDOLAP",
      "Bebek koltuk",
      "SU Ücretsiz",
      "Alıştırmalık",
      "Mini Bar ( Ücretli )"
    ],
    extraFeatures: [
      "İsim levhası ile buluşma",
      "Gizli Maliyet Yok"
    ],
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

export default function AralarPage() {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-red-950">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Araç Filomuz
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Tüm araçlarımız VIP standartlarında olup, konforunuz için özel olarak tasarlanmıştır. 
          Her türlü transfer ihtiyacınız için size en uygun aracı seçebilirsiniz.
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          {vehicles.map((vehicle) => {
            const currentImageIndex = getCurrentImageIndex(vehicle.id)

            return (
              <div key={vehicle.id} 
                className={`bg-black/80 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:ring-2 ${
                  vehicle.isPopular 
                    ? 'hover:ring-blue-500 border-blue-500/50' 
                    : 'hover:ring-red-500 border-gray-800'
                } relative border`}
              >
                {vehicle.isPopular && (
                  <div className="absolute -top-3 -left-2 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-1.5 text-sm transform -skew-x-12 rounded shadow-lg">
                      <div className="transform skew-x-12 font-semibold tracking-wide animate-pulse">
                        EN ÇOK TERCİH EDİLEN
                      </div>
                    </div>
                    <div className="absolute top-0 -right-2 h-3 w-2 bg-blue-800 transform skew-y-45 -z-10" />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Araç Görseli */}
                  <div className="md:col-span-5 relative h-[450px] md:h-[400px] cursor-pointer" onClick={() => setSelectedImage(vehicle.images[currentImageIndex])}>
                    <div className="absolute inset-0 flex items-center justify-between z-10 px-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(vehicle.id, vehicle.images.length);
                        }} 
                        className="w-10 h-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-xl"
                      >
                        ‹
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(vehicle.id, vehicle.images.length);
                        }} 
                        className="w-10 h-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors text-xl"
                      >
                        ›
                      </button>
                    </div>
                    <div className="relative h-full w-full group">
                      <Image
                        src={vehicle.images[currentImageIndex]}
                        alt={vehicle.name}
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="bg-black/70 px-4 py-2 rounded-full text-white text-sm">
                          Büyütmek için tıklayın
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {vehicle.images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndices(prev => ({ ...prev, [vehicle.id]: idx }));
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Özellikler */}
                  <div className="md:col-span-7 text-white space-y-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        vehicle.isPopular ? 'text-blue-400' : 'text-red-400'
                      }`}>
                        {vehicle.name}
                      </h3>
                      <p className="text-gray-400 mt-2">{vehicle.description}</p>
                    </div>
                    
                    <div className="flex gap-8 text-sm">
                      <div>
                        <span className="text-gray-400">Yolcu:</span>
                        <p className="font-medium">{vehicle.passengerCapacity} Kişi</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Bagaj:</span>
                        <p className="font-medium">{vehicle.luggageCapacity} Parça</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Özellikler:</div>
                        <div className="space-y-1 text-sm">
                          {vehicle.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300 text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-400 mb-2">Ekstra:</div>
                        <div className="space-y-1">
                          {vehicle.extraFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300 text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl max-h-[90vh] aspect-video">
            <Image
              src={selectedImage}
              alt="Büyütülmüş görsel"
              fill
              className="object-contain"
              quality={100}
            />
          </div>
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </main>
  )
} 