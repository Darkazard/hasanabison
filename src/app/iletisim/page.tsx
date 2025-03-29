export default function Iletisim() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">İletişim</span>
          </h1>
          <p className="text-xl text-gray-300">
            Bizimle iletişime geçin, size yardımcı olalım.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 animate-fadeIn">
          <div className="bg-black p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white">Bize Ulaşın</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Ad Soyad</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">E-posta</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-400 mb-2">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Mesajınız</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Gönder
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-black p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">İletişim Bilgileri</h2>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-red-500"></i>
                  <span>+90 552 898 8899</span>
                </div>
                <li className="flex items-center gap-2">
                  <i className="fas fa-envelope"></i>
                  <span>info@antalyatourtransfer.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Peir Glory Apt. A blok 4/12 Florya sokak Altıntaş/Antalya</span>
                </li>
              </div>
            </div>

            <div className="bg-black p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Sosyal Medya</h2>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/1E1ibqFgR6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/antalia_transfer/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/905528988899" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 