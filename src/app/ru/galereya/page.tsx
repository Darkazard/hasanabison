'use client'

export default function Galereya() {
  const galleryImages = Array.from({ length: 66 }, (_, index) => ({
    src: `/images/gallery/image${index + 1}.jpg`,
    alt: `Фото галереи ${index + 1}`
  }))

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наша{" "}
            <span className="text-red-600">
              Галерея
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
          {galleryImages.map((image, index) => (
            <div key={index} className="bg-black rounded-xl shadow-lg overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 