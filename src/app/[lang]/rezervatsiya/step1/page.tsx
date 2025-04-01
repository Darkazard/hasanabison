'use client'

import { useRouter } from 'next/navigation'
import { translations } from '@/translations'

export default function Step1Page() {
  const router = useRouter()
  const t = translations.ru

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">{t.reservation}</h1>
          {/* Add your step1 form content here */}
        </div>
      </div>
    </div>
  )
} 