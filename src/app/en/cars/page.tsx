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
    name: "Economy VIP",
    description: "Spacious interior with leather seats and special interior design.",
    images: [
      "/vehicles/economy1.jpg",
      "/vehicles/economy2.jpg",
      "/vehicles/economy3.jpg",
      "/vehicles/economy4.jpg",
      "/vehicles/economy5.jpg"
    ],
    passengerCapacity: "1-5",
    luggageCapacity: "1-5",
    features: [
      "Services Included in Price",
      "TV & WiFi & REFRIGERATOR",
      "Baby seat",
      "WATER Free",
      "Snacks",
      "Mini Bar (Paid)"
    ],
    extraFeatures: [
      "Meeting with name sign",
      "No Hidden Costs"
    ],
    price: 25
  },
  {
    id: 2,
    name: "Premium VIP (Ultra Luxury)",
    description: "Start taking your holiday photos at the airport",
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
      "Services Included in Price",
      "TV & WiFi & REFRIGERATOR",
      "Baby seat",
      "WATER Free",
      "Snacks",
      "Mini Bar (Paid)"
    ],
    extraFeatures: [
      "Meeting with name sign",
      "No Hidden Costs"
    ],
    price: 35,
    isPopular: true
  },
  {
    id: 3,
    name: "Business VIP",
    description: "Specially designed comfort for business travel.",
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
      "Services Included in Price",
      "TV & WiFi & REFRIGERATOR",
      "Work Desk",
      "WATER Free",
      "Mini Bar (Paid)"
    ],
    extraFeatures: [
      "Meeting with name sign",
      "No Hidden Costs"
    ],
    price: 30
  },
  {
    id: 4,
    name: "Family VIP",
    description: "Ideal choice for large families.",
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
      "Services Included in Price",
      "TV & WiFi & REFRIGERATOR",
      "2 Baby seats",
      "WATER Free",
      "Snacks",
      "Mini Bar (Paid)"
    ],
    extraFeatures: [
      "Meeting with name sign",
      "No Hidden Costs"
    ],
    price: 40
  },
  {
    id: 5,
    name: "Luxury VIP",
    description: "Top-level comfort and luxury experience.",
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
      "Services Included in Price",
      "TV & WiFi & REFRIGERATOR",
      "Massage Seat",
      "WATER Free",
      "Snacks",
      "Mini Bar (Paid)"
    ],
    extraFeatures: [
      "Meeting with name sign",
      "No Hidden Costs"
    ],
    price: 45
  }
]

export default function CarsPage() {
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
          Our Vehicle Fleet
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          All our vehicles meet VIP standards and are specially designed for your comfort. 
          You can choose the most suitable vehicle for any transfer need.
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
                        MOST PREFERRED
                      </div>
                    </div>
                    <div className="absolute top-0 -right-2 h-3 w-2 bg-blue-800 transform skew-y-45 -z-10" />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Vehicle Image */}
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
                          Click to enlarge
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {vehicle.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="md:col-span-7">
                    <h2 className="text-2xl font-bold text-white mb-4">{vehicle.name}</h2>
                    <p className="text-gray-400 mb-6">{vehicle.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Passenger Capacity</div>
                        <div className="text-white font-semibold">{vehicle.passengerCapacity}</div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm mb-1">Luggage Capacity</div>
                        <div className="text-white font-semibold">{vehicle.luggageCapacity}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                      <ul className="space-y-2">
                        {vehicle.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <i className="fas fa-check text-red-500"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Extra Features</h3>
                      <ul className="space-y-2">
                        {vehicle.extraFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-300">
                            <i className="fas fa-star text-yellow-500"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        From <span className="text-red-500">${vehicle.price}</span>
                      </div>
                      <a
                        href="/en/reservation"
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
            <Image
              src={selectedImage}
              alt="Vehicle"
              width={1200}
              height={800}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  )
} 