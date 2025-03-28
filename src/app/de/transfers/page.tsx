export default function Transfers() {
  const transferServices = [
    {
      title: "Airport Transfer",
      description: "Safe transfer from Antalya Airport to your hotel or from your hotel to the airport.",
      icon: "plane",
      price: "Starting from: €10"
    },
    {
      title: "Hotel Transfer",
      description: "Comfortable and safe transfer service between hotels.",
      icon: "hotel",
      price: "Starting from: €8"
    },
    {
      title: "VIP Transfer",
      description: "Private transfer service with luxury vehicles.",
      icon: "star",
      price: "Starting from: €15"
    },
    {
      title: "Group Transfer",
      description: "Special transfer solutions for large groups.",
      icon: "users",
      price: "Per person: €5"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our{" "}
            <span className="text-red-600">
              Transfer
            </span>{" "}
            Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We offer you a safe and comfortable travel experience with our special transfer solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {transferServices.map((service, index) => (
            <div key={index} className="bg-black p-8 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-4xl mb-4">
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <p className="text-lg font-semibold text-red-500">{service.price}</p>
              <a href="/en/reservation" className="btn btn-primary w-full mt-4">
                Make Reservation
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Special Transfer Request
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Do you have a special transfer request that's not listed in our services?
            Contact us, and we'll provide you with a custom solution.
          </p>
          <div className="flex justify-center">
            <a href="/en/contact" className="btn btn-outline">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 