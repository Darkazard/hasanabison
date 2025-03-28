export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">
              About Us
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Over 10 years of experience in reliable and comfortable transfer services
          </p>
        </div>

        <div className="grid gap-12 animate-fadeIn">
          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Who Are We?</h2>
            <p className="text-gray-400 leading-relaxed">
              As Holiday Transfer, we have been serving in the tourism sector in Antalya for over 10 years. 
              We provide safe and comfortable transfer services while maintaining customer satisfaction at the highest level.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to provide our customers with the highest quality and most reliable transfer service, 
              making their travel experiences unforgettable.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Professional and experienced driver team</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Modern and comfortable vehicle fleet</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Competitive and transparent pricing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 