'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/data/routes'

const Step1Page = () => {
  const router = useRouter()
  const [selectedRoute, setSelectedRoute] = useState<{ from: string; to: string; price: number } | null>(null)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRoute) return

    const data = {
      pickupLocation: selectedRoute.from,
      dropoffLocation: selectedRoute.to,
      adults,
      children,
      price: selectedRoute.price
    }

    localStorage.setItem('reservationStep1', JSON.stringify(data))
    router.push('/tr/rezervasyon/step2')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 bg-gradient-to-r from-amber-900/80 to-amber-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-700/50">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 text-center">Toprak VIP Transfer'e Hoş Geldiniz</h2>
            <div className="text-amber-100/90 space-y-4 text-sm">
              <p>
                Lüks araçlarımızla özel havalimanı transfer hizmeti sunuyor, varışınızdan itibaren konforlu bir yolculuk sağlıyoruz. Deneyimli sürücülerimiz sizi havalimanında isminizin yazılı olduğu bir tabela ile karşılayacak ve bagajlarınızla ilgilenecektir.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gizli maliyet olmadan sabit fiyatlar</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24 saat öncesine kadar ücretsiz iptal</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>WhatsApp üzerinden 7/24 destek</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transfer sonrası nakit veya kart ile ödeme</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-8 text-center">Transfer Seçin</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Güzergah Seçin</h2>
              <div className="space-y-4">
                {routes.map((route, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedRoute?.from === route.from && selectedRoute?.to === route.to
                        ? 'bg-red-500/20 border-red-500'
                        : 'bg-gray-900/50 border-gray-800 hover:bg-gray-800/50'
                    } border`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">{route.from}</div>
                        <div className="text-gray-400 text-sm">→</div>
                        <div className="text-white font-medium">{route.to}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">${route.price}</div>
                        <div className="text-gray-400 text-sm">yolculuk başına</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Yolcular</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Yetişkin
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Çocuk
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedRoute}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                selectedRoute
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-500/25'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Araç Seçimine Geç
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Step1Page 