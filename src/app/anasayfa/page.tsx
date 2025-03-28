'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const slides = [
    { image: '/images/slider/slide1.jpg' },
    { image: '/images/slider/slide2.jpg' },
    { image: '/images/slider/slide3.jpg' },
    { image: '/images/slider/slide4.jpg' },
    { image: '/images/slider/slide5.jpg' },
    { image: '/images/slider/slide6.jpg' },
    { image: '/images/slider/slide7.jpg' },
    { image: '/images/slider/slide8.jpg' },
    { image: '/images/slider/slide9.jpg' },
    { image: '/images/slider/slide10.jpg' },
    { image: '/images/slider/slide11.jpg' },
    { image: '/images/slider/slide12.jpg' },
    { image: '/images/slider/slide13.jpg' },
    { image: '/images/slider/slide14.jpg' },
    { image: '/images/slider/slide15.jpg' },
    { image: '/images/slider/slide16.jpg' }
  ]

  const getVisibleNumbers = () => {
    const totalSlides = slides.length;
    const current = activeSlide;
    
    if (current === 0) return [totalSlides - 1, 0, 1];
    if (current === totalSlides - 1) return [totalSlides - 2, totalSlides - 1, 0];
    return [current - 1, current, current + 1];
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Modern Slider Section */}
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="relative max-w-6xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[55vh] lg:h-[85vh]">
              <Swiper
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={false}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="w-full h-full rounded-2xl"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveSlide(swiper.realIndex);
                }}
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={slide.image}
                        alt={`Slide ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{ objectFit: 'cover' }}
                        className="rounded-2xl lg:object-contain lg:bg-[#111]"
                        priority={index === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Custom Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {getVisibleNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.slideToLoop(num);
                    }
                  }}
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all duration-300 ${
                    activeSlide === num
                      ? 'bg-red-500 text-white scale-110'
                      : 'bg-black/50 text-gray-300 hover:bg-black/70 hover:text-white'
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Reservation Form */}
          <div className="mt-8">
            <ReservationForm showExtras={true} />
          </div>
        </div>
      </main>

      {/* About Us Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Hakkımızda</h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <div className="text-gray-300 space-y-6">
              <p>
                2013 yılından bu yana Start Holiday VIP Transfer, Antalya'da lüks ve konforlu ulaşım hizmetleri sunmaktadır. Her yıl misafirlerimizden aldığımız değerli geri bildirimler ve profesyonel ekibimizin özverili çalışmasıyla hizmet kalitemizi artırmaktayız.
              </p>
              
              <p>
                Misafirlerimize sadece transfer hizmeti sunmakla kalmıyor, unutulmaz seyahat deneyimleri yaratmayı hedefliyoruz. VIP minibüslerimizle sunduğumuz özel hizmetlerimiz:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Havalimanı - Otel Transferleri: Sizi konfor ve güvenle varış noktanıza ulaştırıyoruz.</li>
                <li>Alışveriş Turları: Mall of Antalya, Terracity, Mark Antalya gibi Antalya'nın en prestijli alışveriş merkezlerine özel VIP ulaşım sağlıyoruz.</li>
                <li>Antalya şehir, Kemer, Side, Manavgat, Alanya, Dimçayı, Kaş, Fethiye, Ölüdeniz, Saklıkent Fethiye: Antalya ve çevresinin doğal ve tarihi güzelliklerini keşfetmek isteyen misafirlerimiz için özel rotalar sunuyoruz.</li>
                <li>St. Nicholas Kilisesi Ziyareti: Noel Baba olarak bilinen Aziz Nicholas'ın Demre'deki ölümünden sonra inşa edilen bir kilise. Noel Baba'nın ölümünden sonra bir süre burada yattığı ve daha sonra kalıntılarının İtalyan denizciler tarafından Bari'ye götürüldüğüne inanılıyor.</li>
              </ul>

              <p>
                <strong className="text-white">Özel VIP Turlar:</strong> Kendi programınızı oluşturabilir ve profesyonel sürücülerimiz eşliğinde özel bir deneyim yaşayabilirsiniz.
              </p>

              <p className="text-xl font-semibold text-white text-center mt-8">
                Antalya'daki yolculuğunuzu unutulmaz kılmak için buradayız, lüks, konfor ve güvenliği bir araya getiren hizmetlerle!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 