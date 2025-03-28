export default function Turlar() {
  const tours = [
    {
      title: "Antalya Şehir Turu",
      description: "Kaleiçi, Düden Şelalesi ve daha fazlası...",
      duration: "Tam Gün",
      price: "Kişi başı: 400₺",
      image: "/images/tours/city-tour.jpg"
    },
    {
      title: "Pamukkale Turu",
      description: "Travertenler, Antik Havuz ve Hierapolis...",
      duration: "Tam Gün",
      price: "Kişi başı: 600₺",
      image: "/images/tours/pamukkale.jpg"
    },
    {
      title: "Demre-Myra-Kekova Turu",
      description: "Batık Şehir, Noel Baba Kilisesi...",
      duration: "Tam Gün",
      price: "Kişi başı: 500₺",
      image: "/images/tours/kekova.jpg"
    },
    {
      title: "Kapadokya Turu",
      description: "2 gün 1 gece muhteşem Kapadokya deneyimi...",
      duration: "2 Gün",
      price: "Kişi başı: 1200₺",
      image: "/images/tours/cappadocia.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">
              Turlarımız
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Antalya ve çevresinin en güzel yerlerini keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {tours.map((tour, index) => (
            <div key={index} className="bg-black rounded-xl shadow-lg overflow-hidden hover-card">
              <div className="h-48 bg-gray-800">
                {/* Resim eklendikten sonra aşağıdaki Image componenti kullanılabilir */}
                {/* <Image src={tour.image} alt={tour.title} width={600} height={300} className="w-full h-full object-cover" /> */}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-white">{tour.title}</h3>
                <p className="text-gray-400 mb-4">{tour.description}</p>
                <div className="flex items-center gap-4 text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock"></i>
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-tag"></i>
                    <span className="text-red-500 font-semibold">{tour.price}</span>
                  </div>
                </div>
                <button className="btn btn-primary w-full">
                  Rezervasyon Yap
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg text-center animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Özel Tur mu Arıyorsunuz?
          </h2>
          <p className="text-gray-400 mb-8">
            Size özel tur programı oluşturalım. İstediğiniz yerleri, istediğiniz sürede gezin.
          </p>
          <a href="/iletisim" className="btn btn-outline">
            Özel Tur Talebi
          </a>
        </div>
      </div>
    </div>
  )
} 