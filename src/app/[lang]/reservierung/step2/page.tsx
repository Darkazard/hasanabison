'use client'

import { useRouter } from 'next/navigation'
import { translations } from '@/translations'

type Language = 'en' | 'de' | 'ru' | 'tr'

interface PageProps {
  params: {
    lang: Language
  }
}

export default function Step2Page({ params }: PageProps) {
  const router = useRouter()
  const t = translations[params.lang]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${params.lang}/reservierung/step3`)
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">{t.reservation}</h1>
          <form onSubmit={handleSubmit}>
            {/* Add your step2 form content here */}
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              {t.next}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 