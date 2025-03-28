export default function Transferler() {
  const transferServices = [
    {
      title: "Havalimanı Transferi",
      description: "Antalya Havalimanı'ndan otelinize veya otelinizden havalimanına güvenli transfer.",
      icon: "plane",
      price: "Başlangıç fiyatı: 300₺"
    },
    {
      title: "Otel Transferi",
      description: "Oteller arası konforlu ve güvenli transfer hizmeti.",
      icon: "hotel",
      price: "Başlangıç fiyatı: 250₺"
    },
    {
      title: "VIP Transfer",
      description: "Lüks araçlarla özel transfer hizmeti.",
      icon: "star",
      price: "Başlangıç fiyatı: 500₺"
    },
    {
      title: "Grup Transferi",
      description: "Büyük gruplar için özel transfer çözümleri.",
      icon: "users",
      price: "Kişi başı: 150₺"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">
              Transfer
            </span>{" "}
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Size özel transfer çözümleri ile güvenli ve konforlu yolculuk deneyimi sunuyoruz.
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
              <button className="btn btn-primary w-full mt-4">
                Rezervasyon Yap
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Özel Transfer Talebi
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Listedeki transfer hizmetleri dışında özel bir transfer talebiniz mi var?
            Bizimle iletişime geçin, size özel çözüm sunalım.
          </p>
          <div className="flex justify-center">
            <a href="/iletisim" className="btn btn-outline">
              İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 