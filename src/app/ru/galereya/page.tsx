export default function Gallery() {
  const images = [
    {
      src: "/images/gallery/transfer1.jpg",
      alt: "VIP Transfer Service",
      category: "Transfer"
    },
    {
      src: "/images/gallery/antalya1.jpg",
      alt: "Antalya Old Town",
      category: "Antalya"
    },
    {
      src: "/images/gallery/car1.jpg",
      alt: "Mercedes Vito",
      category: "Vehicles"
    },
    {
      src: "/images/gallery/tour1.jpg",
      alt: "Pamukkale Tour",
      category: "Tours"
    },
    {
      src: "/images/gallery/transfer2.jpg",
      alt: "Airport Transfer",
      category: "Transfer"
    },
    {
      src: "/images/gallery/antalya2.jpg",
      alt: "Duden Waterfall",
      category: "Antalya"
    },
    {
      src: "/images/gallery/car2.jpg",
      alt: "Mercedes E-Class",
      category: "Vehicles"
    },
    {
      src: "/images/gallery/tour2.jpg",
      alt: "Cappadocia Tour",
      category: "Tours"
    },
    {
      src: "/images/gallery/transfer3.jpg",
      alt: "Hotel Transfer",
      category: "Transfer"
    },
    {
      src: "/images/gallery/antalya3.jpg",
      alt: "Konyaalti Beach",
      category: "Antalya"
    },
    {
      src: "/images/gallery/car3.jpg",
      alt: "Mercedes Sprinter",
      category: "Vehicles"
    },
    {
      src: "/images/gallery/tour3.jpg",
      alt: "Demre-Myra Tour",
      category: "Tours"
    }
  ]

  const categories = ["All", "Transfer", "Antalya", "Vehicles", "Tours"]

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Moments from our services and tours.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 animate-fadeIn">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-2 rounded-full bg-black shadow-md hover:shadow-lg transition-all
                       text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg hover-card"
            >
              <div className="h-64 bg-gray-800">
                {/* Image component can be used after adding images */}
                {/* <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                /> */}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-lg font-semibold mb-2">{image.alt}</h3>
                  <span className="text-sm bg-red-600 px-3 py-1 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg text-center animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            More Photos
          </h2>
          <p className="text-gray-400 mb-8">
            Follow our social media accounts for more photos and current updates.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-gray-400 hover:text-red-500">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 