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

export default function ReviewsPage() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [service, setService] = useState('transfer')

  const reviews: Review[] = [
    {
      id: 1,
      name: "John Smith",
      rating: 5,
      date: "March 15, 2024",
      comment: "Our airport transfer was excellent. The driver was very polite and professional. The vehicle was clean and comfortable. Highly recommended.",
      service: "Airport Transfer"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      rating: 5,
      date: "March 12, 2024",
      comment: "Our VIP Mercedes transfer was very comfortable. They provided special seats for our children. We were very satisfied.",
      service: "VIP Transfer"
    },
    {
      id: 3,
      name: "Michael Brown",
      rating: 4,
      date: "March 10, 2024",
      comment: "They arrived on time and we had a safe journey. The only downside was that the air conditioning took a bit to start working.",
      service: "Hotel Transfer"
    },
    {
      id: 4,
      name: "Emma Wilson",
      rating: 5,
      date: "March 8, 2024",
      comment: "Everything was perfect from the reservation process until the end of the journey. Thank you Holiday Transfer!",
      service: "Airport Transfer"
    },
    {
      id: 5,
      name: "David Lee",
      rating: 5,
      date: "March 5, 2024",
      comment: "Our transfer with Premium Mercedes was unforgettable. Our driver was very knowledgeable and gave us great information about Antalya.",
      service: "Premium Transfer"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      rating: 5,
      date: "March 3, 2024",
      comment: "Perfect choice for our group transfer. Our team of 7 had a comfortable journey.",
      service: "Group Transfer"
    },
    {
      id: 7,
      name: "Robert Taylor",
      rating: 4,
      date: "March 1, 2024",
      comment: "Professional service, clean vehicle. We just had to wait a bit at the airport but we were kept informed.",
      service: "Airport Transfer"
    },
    {
      id: 8,
      name: "Sophie Martin",
      rating: 5,
      date: "February 28, 2024",
      comment: "We got VIP transfer service for our wedding. Everyone was very impressed. Thank you!",
      service: "VIP Transfer"
    },
    {
      id: 9,
      name: "James Wilson",
      rating: 5,
      date: "February 25, 2024",
      comment: "Used for my business trip. Right on time, professional service. Will choose again.",
      service: "Premium Transfer"
    },
    {
      id: 10,
      name: "Maria Garcia",
      rating: 5,
      date: "February 22, 2024",
      comment: "We were very satisfied as a family. The special seats for children were super.",
      service: "Family Transfer"
    },
    {
      id: 11,
      name: "Thomas Clark",
      rating: 4,
      date: "February 20, 2024",
      comment: "Perfect for economic transfer. Clean vehicle and polite driver.",
      service: "Economic Transfer"
    },
    {
      id: 12,
      name: "Jennifer White",
      rating: 5,
      date: "February 18, 2024",
      comment: "Flawless transfer even at late night hours. Safe and comfortable journey.",
      service: "Night Transfer"
    },
    {
      id: 13,
      name: "William Davis",
      rating: 5,
      date: "February 15, 2024",
      comment: "We got transfer service for our golf tournament. They showed special attention to our equipment.",
      service: "Sports Transfer"
    },
    {
      id: 14,
      name: "Patricia Martinez",
      rating: 5,
      date: "February 12, 2024",
      comment: "Perfect transfer service for shopping tour. The driver was very helpful.",
      service: "City Transfer"
    },
    {
      id: 15,
      name: "Richard Thompson",
      rating: 5,
      date: "February 10, 2024",
      comment: "I use it regularly for my business trips. I'm always satisfied.",
      service: "Business Transfer"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here the review submission process will be handled
    alert('Your review has been successfully submitted!')
    setName('')
    setComment('')
    setRating(5)
    setService('transfer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Customer Reviews</h1>
          
          {/* Reviews List */}
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

          {/* Review Form */}
          <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Service Type</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white"
                >
                  <option value="transfer">Airport Transfer</option>
                  <option value="vip">VIP Transfer</option>
                  <option value="premium">Premium Transfer</option>
                  <option value="ekonomik">Economic Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Your Rating</label>
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
                <label className="block text-gray-400 mb-2">Your Review</label>
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
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 