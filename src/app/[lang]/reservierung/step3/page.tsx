'use client'

import { useRouter } from 'next/navigation'
import { translations } from '@/translations'

type Language = 'en' | 'de' | 'ru' | 'tr'

interface PageProps {
  params: {
    lang: Language
  }
}

export default function Step3Page({ params }: PageProps) {
  const router = useRouter()
  const t = translations[params.lang]

  const handleBack = () => {
    router.push(`/${params.lang}/reservierung/step2`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/${params.lang}/reservierung/step4`)
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">{t.reservation}</h1>
          <form onSubmit={handleSubmit}>
            {/* Add your step3 form content here */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handleBack}
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
    </div>
  )
} 