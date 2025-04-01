'use client'

export default function Transfers() {
  const transferServices = [
    {
      title: "🛍🚕 ШОПИНГ-ТРАНСФЕР ПО МАГАЗИНАМ АНТАЛИИ",
      description: `🛒 Воспользуйтесь нашим автомобилем с водителем, чтобы совершить комфортную поездку по магазинам и торговым центрам в Анталии.
  
🏪 Вот в какие места для любителей шопинга мы можем Вас доставить:
 
1. MarkAntalya (МаркАнталья)
2. Erasta (Эраста)
3. Mall of Antalya (Молл Оф Анталья)
4. ÖzdilekPark (ОздилекПарк)
5. Agora (Агора)
6. TerraCity (ТерраСити)
7. 5М Migros (Мигрос)
8. Deepo Outlet ( Дипо Аутлет ) дипоаутлет 
 
или другие маfгазины в Анталии по Вашему желанию🤗.
 
 
📩 Чтобы узнать подробнее и забронировать поездку, пишите в Whatsap !`,
      icon: "shopping-cart"
    },
    {
      title: "ШОПИНГ-ТРАНСФЕР ПО земля легенд",
      description: `нет ограничения по времени. Мы заберем вас из отеля в назначенное время и отвезем в торговый центр. Мы заберем вас из торгового центра в назначенное время и доставим в отель.

Режим работы: ежедневно с 10.00 - 22.00
‼
Наш сервис аренды авто с водителем быстро и комфортно доставит вас в любой ТЦ Анталии. Кстати, время на шопинг определяете вы сами!🤝
📲 ‪+90 552 898 88 99‬`,
      icon: "map-marked-alt"
    },
    {
      title: "ШОПИНГ-ТРАНСФЕР ПО КАЛЕИЧИ",
      description: `СЕКРЕТНЫЕ МЕСТА КАЛЕИЧИ
Друзья, не знаете куда пойти в Анталии?? Делюсь, с Вами 3мя интереснейшими местами в Старом Городе. Сохраняйте для будущего, пригодится!!
__________
👍🇹🇷☀
1. Скрытый парк
2. Панорамный лифт
3. Пляж Мермерли

Дорогие туристы! Напоминаем, что у нас Вы можете забронировать индивидуальный трансфер, а так же, съездить в индивидуальный тур по собственно-составленному маршруту!`,
      icon: "landmark"
    },
    {
      title: "Обзорная экскурсия по Анталии",
      description: `УНИКАЛЬНОЕ ПРЕДЛОЖЕНИЕ❗❗❗

Только у нас, впервые в Анталии, экскурсионные индивидуальные туры продолжительностью до 8 часов. К вашим услугам предоставляется личный автомобиль премиум-класса (до 8 посадочных мест).

➡Анталия,
🔹Водопады Дуден (Кепез)
🔹Старый город Калеичи
🔹Археологический музей
🔹Аквариум
🔹Парк Ататюрка
🔹Улица зонтиков

Напишите нам! ⤵
Whatsapp & viber & Telegram
‪+90 552 898 88 99‬`,
      icon: "car"
    },
    {
      title: "VIP Трансфер",
      description: `Индивидуальные поездки в:

➡ Памуккале
➡ Фетхие
➡ Каппадокия

Комфортабельные автомобили премиум-класса
Профессиональные водители
Индивидуальный подход к каждому клиенту`,
      icon: "star"
    }
  ]

  const handleWhatsAppClick = (title: string) => {
    const phoneNumber = "905528988899";
    const message = encodeURIComponent(title);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наши{" "}
            <span className="text-red-600">
              Трансферы
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Мы предлагаем вам безопасное и комфортное путешествие с нашими специальными трансферными решениями.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {transferServices.map((service, index) => (
            <div key={index} className="bg-black p-8 rounded-xl shadow-lg hover-card">
              <div className="text-red-500 text-4xl mb-4">
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white whitespace-pre-line">{service.title}</h3>
              <p className="text-gray-400 mb-4 whitespace-pre-line">{service.description}</p>
              <button 
                onClick={() => handleWhatsAppClick(service.title)}
                className="btn btn-primary w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Написать в WhatsApp
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Специальный Запрос Трансфера
          </h2>
          <p className="text-center text-gray-400 mb-8">
            У вас есть специальный запрос на трансфер, которого нет в наших услугах?
            Свяжитесь с нами, и мы предоставим вам индивидуальное решение.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => handleWhatsAppClick("Специальный запрос трансфера")}
              className="btn btn-outline bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Написать в WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 