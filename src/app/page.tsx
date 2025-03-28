import { redirect } from 'next/navigation'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 bg-gradient-to-r from-amber-900/80 to-amber-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-700/50">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 text-center">Toprak VIP Transfer'e Hoş Geldiniz</h2>
            <div className="text-amber-100/90 space-y-4 text-sm">
              <p>
                Lüks araçlarımızla özel havalimanı transfer hizmetleri sunuyoruz ve varış anınızdan itibaren konforlu bir yolculuk sağlıyoruz. Deneyimli sürücülerimiz sizi havalimanında isim tabelası ile karşılayacak ve bagajlarınız konusunda size yardımcı olacaktır.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gizli maliyetler olmadan sabit fiyatlar</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>24 saat öncesine kadar ücretsiz iptal</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>WhatsApp üzerinden 7/24 müşteri desteği</span>
                </div>
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transfer sonrası nakit veya kart ile ödeme</span>
                </div>
              </div>
            </div>
          </div>
          <ReservationForm showExtras={true} />

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">SOSYAL MEDYA</h2>
            {/* Sosyal medya içeriği */}
          </div>

          {/* Yeni eklenen duyuru kutusu */}
          <div className="my-12 bg-gradient-to-r from-amber-900/80 to-amber-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-700/50">
            <h2 className="text-2xl font-bold text-amber-300 mb-4 text-center">LÜTFEN OKUYUNUZ !!!</h2>
            <div className="text-amber-100/90 space-y-4 text-sm">
              <p className="font-semibold mb-4">Değerli misafirlerimiz</p>
              <p>Tatiliniz START HOLIDAY TRANSFER ile başlıyor. Siz ve aileniz bizim için önemlisiniz ✅</p>
              <p>
                Havalimanında sizi isim ve soyisminizin yazılı olduğu karşılama panosuyla karşılıyor ve keyifli bir yolculuk için ücretsiz ikramlarla dolu özel olarak hazırlanmış VIP aracınıza eşlik ediyoruz. Uygun fiyatlarımız, ultra lüks araçlarımız ve kişiye özel hizmet anlayışımızla farkımızı ortaya koyuyoruz. Dönüş transferiniz için rezervasyon saatinde otel veya belirttiğiniz adreste sizi bekliyor ve gideceğiniz noktaya konforlu bir yolculuk sağlıyoruz.
              </p>
              <p>
                Fiyatlarımızda şeffafız: gördüğünüz fiyatlar kişi başı değil, aracın toplam ücretidir. Araç içerisinde bebek koltuğu, internet, soğuk içecekler, atıştırmalıklar, buzdolabı, televizyon ve şarj soketleri gibi hizmetlerimizden ücretsiz yararlanabilirsiniz. Ayrıca tüm yolcularımız özel sigortamız kapsamında olup, güvenliğiniz önceliğimizdir.
              </p>
              <p>
                Artık rezervasyonunuzu ücretsiz olarak online veya 7/24 WhatsApp destek hattımızdan yapabilir, transfer ücretini araç içerisinde nakit veya öncesinde online olarak kredi kartı ile ödeyebilirsiniz.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Transfer Fiyat Listesi</h2>
            <p className="text-gray-400">Güzergah seçimi için tıklayınız</p>
            {/* Transfer fiyat listesi içeriği */}
          </div>
        </div>
      </div>
    </main>
  )
}

