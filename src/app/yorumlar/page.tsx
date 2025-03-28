'use client'

import { useState } from 'react'

interface Review {
  id: number
  name: string
  rating: number
  date: string
  comment: string
  service: string
}

export default function YorumlarPage() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [service, setService] = useState('transfer')

  const reviews: Review[] = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      rating: 5,
      date: "15 Mart 2024",
      comment: "Havalimanından otele transferimiz mükemmeldi. Şoför çok nazik ve profesyoneldi. Araç temiz ve konforluydu. Kesinlikle tavsiye ederim.",
      service: "Havalimanı Transferi"
    },
    {
      id: 2,
      name: "Ayşe Kaya",
      rating: 5,
      date: "12 Mart 2024",
      comment: "VIP Mercedes ile yaptığımız transfer çok konforluydu. Çocuklarımız için özel koltuk sağladılar. Çok memnun kaldık.",
      service: "VIP Transfer"
    },
    {
      id: 3,
      name: "Mehmet Demir",
      rating: 4,
      date: "10 Mart 2024",
      comment: "Zamanında geldiler ve güvenli bir yolculuk yaptık. Tek eksik klima biraz geç devreye girdi.",
      service: "Otel Transferi"
    },
    {
      id: 4,
      name: "Zeynep Şahin",
      rating: 5,
      date: "8 Mart 2024",
      comment: "Rezervasyon sürecinden yolculuğun sonuna kadar her şey kusursuzdu. Teşekkürler Holiday Transfer!",
      service: "Havalimanı Transferi"
    },
    {
      id: 5,
      name: "Can Özdemir",
      rating: 5,
      date: "5 Mart 2024",
      comment: "Premium Mercedes ile yaptığımız transfer unutulmazdı. Şoförümüz çok bilgiliydi ve bize Antalya hakkında güzel bilgiler verdi.",
      service: "Premium Transfer"
    },
    {
      id: 6,
      name: "Elif Yıldız",
      rating: 5,
      date: "3 Mart 2024",
      comment: "Grup transferimiz için ideal bir seçim oldu. 7 kişilik ekibimiz konforlu bir yolculuk yaptı.",
      service: "Grup Transferi"
    },
    {
      id: 7,
      name: "Burak Aydın",
      rating: 4,
      date: "1 Mart 2024",
      comment: "Profesyonel hizmet, temiz araç. Sadece havalimanında biraz bekledik ama bilgilendirildik.",
      service: "Havalimanı Transferi"
    },
    {
      id: 8,
      name: "Selin Çelik",
      rating: 5,
      date: "28 Şubat 2024",
      comment: "Düğünümüz için VIP transfer hizmeti aldık. Herkes çok etkilendi. Teşekkürler!",
      service: "VIP Transfer"
    },
    {
      id: 9,
      name: "Murat Koç",
      rating: 5,
      date: "25 Şubat 2024",
      comment: "İş seyahatim için kullandım. Tam zamanında, profesyonel hizmet. Tekrar tercih edeceğim.",
      service: "Premium Transfer"
    },
    {
      id: 10,
      name: "Deniz Arslan",
      rating: 5,
      date: "22 Şubat 2024",
      comment: "Aile olarak çok memnun kaldık. Çocuklar için özel koltuklar süperdi.",
      service: "Aile Transferi"
    },
    {
      id: 11,
      name: "Gökhan Türk",
      rating: 4,
      date: "20 Şubat 2024",
      comment: "Ekonomik transfer için ideal. Temiz araç ve nazik şoför.",
      service: "Ekonomik Transfer"
    },
    {
      id: 12,
      name: "Aylin Güneş",
      rating: 5,
      date: "18 Şubat 2024",
      comment: "Gece geç saatte bile sorunsuz transfer. Güvenli ve konforlu yolculuk.",
      service: "Gece Transferi"
    },
    {
      id: 13,
      name: "Serkan Yücel",
      rating: 5,
      date: "15 Şubat 2024",
      comment: "Golf turnuvası için transfer hizmeti aldık. Ekipmanlarımız için özel ilgi gösterdiler.",
      service: "Spor Transferi"
    },
    {
      id: 14,
      name: "Pınar Aksu",
      rating: 5,
      date: "12 Şubat 2024",
      comment: "Alışveriş turu için ideal transfer hizmeti. Şoför çok yardımcı oldu.",
      service: "Şehir İçi Transfer"
    },
    {
      id: 15,
      name: "Emre Kılıç",
      rating: 5,
      date: "10 Şubat 2024",
      comment: "Düzenli olarak iş seyahatlerimde kullanıyorum. Her zaman memnun kalıyorum.",
      service: "İş Transferi"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada yorum gönderme işlemi yapılacak
    alert('Yorumunuz başarıyla gönderildi!')
    setName('')
    setComment('')
    setRating(5)
    setService('transfer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Müşteri Yorumları</h1>
          
          {/* Yorumlar Listesi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-semibold">{review.name}</h3>
                    <p className="text-gray-400 text-sm">{review.service}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Yorum Yapma Formu */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Yorum Yap</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Adınız</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Hizmet Türü</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
                >
                  <option value="transfer">Havalimanı Transferi</option>
                  <option value="vip">VIP Transfer</option>
                  <option value="premium">Premium Transfer</option>
                  <option value="ekonomik">Ekonomik Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Puanınız</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? 'text-yellow-500' : 'text-gray-600'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Yorumunuz</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white h-32"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Yorum Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 