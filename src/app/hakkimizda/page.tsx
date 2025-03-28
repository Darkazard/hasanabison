export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">
              Hakkımızda
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Güvenilir ve konforlu transfer hizmetinde 10 yılı aşkın deneyim
          </p>
        </div>

        <div className="grid gap-12 animate-fadeIn">
          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Biz Kimiz?</h2>
            <p className="text-gray-400 leading-relaxed">
              Holiday Transfer olarak, Antalya'da turizm sektöründe 10 yılı aşkın süredir hizmet vermekteyiz. 
              Müşteri memnuniyetini en üst düzeyde tutarak, güvenli ve konforlu transfer hizmetleri sunmaktayız.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Misyonumuz</h2>
            <p className="text-gray-400 leading-relaxed">
              Misyonumuz, müşterilerimize en kaliteli ve güvenilir transfer hizmetini sunmak, 
              onların seyahat deneyimlerini unutulmaz kılmaktır.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-lg hover-card">
            <h2 className="text-2xl font-semibold mb-4 text-white">Neden Biz?</h2>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Profesyonel ve deneyimli sürücü kadrosu</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Modern ve konforlu araç filosu</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>7/24 müşteri desteği</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-red-500"></i>
                <span>Rekabetçi ve şeffaf fiyatlandırma</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 