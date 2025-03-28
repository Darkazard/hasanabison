'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/data/routes'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function Step1() {
  return (
    <div className="min-h-screen bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black/60 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <ReservationForm showExtras={false} />
        </div>
      </div>
    </div>
  )
} 