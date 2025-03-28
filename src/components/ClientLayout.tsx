'use client'

import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language, isLoading } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMenuOpen]);

  const trLinks = [
    { href: "/anasayfa", text: "Ana Sayfa" },
    { href: "/rezervasyon", text: "Rezervasyon" },
    { href: "/arabalar", text: "Arabalar" },
    { href: "/transferler", text: "Transferler" },
    { href: "/galeri", text: "Galeri" },
    { href: "/hakkimizda", text: "Hakkımızda" },
    { href: "/yorumlar", text: "Yorumlar" },
    { href: "/iletisim", text: "İletişim" },
  ];

  const enLinks = [
    { href: "/en/home", text: "Home" },
    { href: "/en/reservation", text: "Reservation" },
    { href: "/en/cars", text: "Cars" },
    { href: "/en/transfers", text: "Transfers" },
    { href: "/en/gallery", text: "Gallery" },
    { href: "/en/about", text: "About" },
    { href: "/en/reviews", text: "Reviews" },
    { href: "/en/contact", text: "Contact" },
  ];

  const ruLinks = [
    { href: '/ru/glavnaya', text: 'Главная' },
    { href: '/ru/rezervatsiya', text: 'Бронирование' },
    { href: '/ru/avtomobili', text: 'Автомобили' },
    { href: '/ru/transfery', text: 'Трансферы' },
    { href: '/ru/galereya', text: 'Галерея' },
    { href: '/ru/o-nas', text: 'О нас' },
    { href: '/ru/otzyvy', text: 'Отзывы' },
    { href: '/ru/kontakty', text: 'Контакты' }
  ];

  const deLinks = [
    { href: '/de/startseite', text: 'Startseite' },
    { href: '/de/reservierung', text: 'Reservierung' },
    { href: '/de/autos', text: 'Autos' },
    { href: '/de/transfers', text: 'Transfers' },
    { href: '/de/galerie', text: 'Galerie' },
    { href: '/de/uber-uns', text: 'Über uns' },
    { href: '/de/bewertungen', text: 'Bewertungen' },
    { href: '/de/kontakt', text: 'Kontakt' }
  ];

  const links = language === 'tr' ? trLinks : language === 'en' ? enLinks : language === 'ru' ? ruLinks : deLinks;
  const logoLink = language === 'tr' ? '/anasayfa' : language === 'en' ? '/en/home' : language === 'ru' ? '/ru/glavnaya' : '/de/startseite';

  // If still loading, don't render the layout
  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
        <div className="flex justify-between items-center py-4 px-4">
          <a href={logoLink} className="text-xl font-bold text-white">
            <span className="text-red-600">Holiday</span> Transfer
          </a>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/95 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        style={{ top: '60px', height: 'calc(100vh - 60px)', zIndex: 40 }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 p-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-lg hover:text-red-500 w-full text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Navigation */}
      <nav className="bg-black shadow-md hidden md:block">
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex justify-between items-center">
            <a href={logoLink} className="text-xl font-bold text-white">
              <span className="text-red-600">Holiday</span> Transfer
            </a>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                {links.map((link) => (
                  <a key={link.href} href={link.href} className="nav-link text-sm">
                    {link.text}
                  </a>
                ))}
              </div>
              <div className="border-l border-gray-700 pl-4">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 md:pt-0">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Holiday Transfer</h3>
              <p className="text-gray-400">
                {language === 'en' 
                  ? "We are at your service with the most reliable and comfortable transfer services in Antalya."
                  : language === 'ru'
                  ? "Мы к вашим услугам с самыми надежными и комфортными трансферными услугами в Анталии."
                  : language === 'de'
                  ? "Wir stehen Ihnen mit den zuverlässigsten und komfortabelsten Transferdiensten in Antalya zur Verfügung."
                  : "Antalya'nın en güvenilir ve konforlu transfer hizmetleri ile hizmetinizdeyiz."}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'en' ? "Quick Links" : language === 'ru' ? "Быстрые ссылки" : language === 'de' ? "Schnelllinks" : "Hızlı Linkler"}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-400 hover:text-red-500">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'en' ? "Contact" : language === 'ru' ? "Контакты" : language === 'de' ? "Kontakt" : "İletişim"}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <i className="fas fa-phone"></i>
                  <span>+90 552 898 8899</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-envelope"></i>
                  <span>info@holidaytransfer.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Fener Mah. Tekelioğlu Cad. No:1 Muratpaşa/Antalya</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === 'en' ? "Social Media" : language === 'ru' ? "Социальные сети" : language === 'de' ? "Soziale Medien" : "Sosyal Medya"}
              </h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 text-2xl">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Holiday Transfer. {language === 'en' ? "All rights reserved." : language === 'ru' ? "Все права защищены." : language === 'de' ? "Alle Rechte vorbehalten." : "Tüm hakları saklıdır."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 