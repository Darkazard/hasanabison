'use client'

import ReservationForm from '@/components/Reservation/ReservationForm'
import { Route, routes } from '@/data/routes'

export default function Step1() {
  return (
    <div className="min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black/60 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <ReservationForm showExtras={false} />
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white text-center mb-4">
              Transfer Price List
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {routes.map((route: Route, index: number) => (
                <div
                  key={index}
                  className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <svg 
                        className="w-5 h-5 text-gray-500"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-400">From</p>
                        <p className="text-white font-medium">{route.from}</p>
                        <p className="text-sm text-gray-400 mt-2">To</p>
                        <p className="text-white font-medium">{route.to}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-red-500">
                        {route.price} $
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 