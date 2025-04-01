'use client'

export default function Transfers() {
  const transferServices = [
    {
      title: "🛍🚕 SHOPPING TRANSFER TO SHOPS IN ANTALYA",
      description: `🛒 Use our car with driver for a comfortable ride to shops and shopping centers in Antalya.
  
🏪 Here are the places for shopping lovers that we can take you to:
 
1. MarkAntalya (MarkAntalya)
2. Erasta (Erasta)
3. Antalya Shopping Center
4. ÖzdilekPark (OzdilekPark)
5. Agora (Agora)
6. TerraCity (TerraCity)
7. 5M Migros (Migros)
8. Deepo Outlet (Deepo Outlet) Deepo Outlet 
 
or other shops in Antalya upon your request🤗.
 
 
📩 To learn more and book a trip, write to us on WhatsApp!`,
      icon: "shopping-cart"
    },
    {
      title: "SHOPPING TRANSFER TO LAND OF LEGENDS",
      description: `No time limit. We pick you up from your hotel at the agreed time and take you to the shopping center. We pick you up from the shopping center at the agreed time and take you back to your hotel.

⠀
Opening Hours: Daily from 10:00 to 22:00
‼
Our car rental service with driver takes you quickly and comfortably to any shopping center in Antalya. You decide the shopping time yourself!🤝
📲 ‪+90 552 898 88 99‬`,
      icon: "map-marked-alt"
    },
    {
      title: "Shopping Transfer to Antalya Shops",
      description: `No time limit. We pick you up from your hotel at the agreed time and take you to the shopping center. We pick you up from the shopping center at the agreed time and take you back to your hotel.

Outlet is a beautiful word for every shopaholic. 😁 Every shopaholic knows that Deepo is the largest outlet shopping center in Antalya. But maybe not everyone knows that a few years ago, a large shopping center, Mall of Antalya, was added. Now it's 2 in 1, both discount and new collections in one place🤩
⠀
Shopping enthusiasts who vacation in Belek and Kundu regions are the luckiest – for them, the travel time is 20-30 minutes. From Kemer and Side, it takes longer: 1 hour -1.15.
⠀
And even luckier are the sweet tooths who made it here 😍 Because here are the coolest candy stores that make Turkish honey pastry "Afyon Lokum Atölyesi" and delicious baklava "Güllüoğlu" @farukgulluoglu. There are separate posts about these topics with details if you missed them 😉
⠀
Opening Hours: Daily from 10:00 to 22:00
‼
Our car rental service with driver takes you quickly and comfortably to any shopping center in Antalya. You decide the shopping time yourself!🤝
📲 ‪+90 552 898 88 99‬`,
      icon: "store"
    },
    {
      title: "Shopping Transfer around Kaleici",
      description: `SECRET PLACES OF KALEICI
Friends, do you know where to go in Antalya? I'll show you three of the most interesting places in the old town. Save for the future, it will be useful!!
__________
👍🇹🇷☀
1. Hidden Park
A small green area hidden in Kaleici – offers a great view of the entire city center and especially the harbor. The area is surrounded by green spaces, recreation areas, small fountains, and various wooden sculptures that decorate the park.
2. Panoramic Elevator
This elevator provides convenient access from the main street level to the harbor in the old town. The view from the balcony offers a breathtaking panoramic view of all of Kaleici, the sea, and the Gulf of Antalya.
3. Mermerli Beach
The only place to swim in Kaleici. It's part of a restaurant of the same name and can only be reached through the restaurant. Beach entry is paid. Great view, restaurant service, comfortable, clean beach with crystal clear water.

Dear tourists! We remind you that you can book an individual transfer with us and also take an individual tour along a route of your choice!`,
      icon: "landmark"
    },
    {
      title: "City Tour of Antalya",
      description: `UNIQUE OFFER❗❗❗

Only with us for the first time in Antalya, individual excursion tours with a duration of up to 8 hours. A personal premium car (up to 8 seats) is at your disposal. Our drivers take you to the main attractions of Antalya, wait for you, and take photos of you and your companions. We don't take our tourists to shops! You can customize all programs yourself! The cost for each program is $60-150 for the entire tour, not per tourist! The price varies depending on your hotel location and chosen destination.
👇🏼👇🏼👇🏼

➡Antalya,
🔹Duden (Kepez) Waterfalls
🔹Old Town Kaleici
🔹Archaeological Museum
🔹Aquarium
🔹Atatürk Park
🔹Umbrella Street

➡Antalya, Lara
🔹Duden Lara Waterfalls
🔹Amusement Park (Rafting)
🔹Shooting Range
🔹Quad Safari
🔹Cable Car
🔹Antalya Marina & Boat Tour
🔹Antalya Shopping Center

➡Antalya, Kemer:
🔹Göynük Canyon
🔹Cable Car
🔹Ulupinar Waterfalls
🔹Yacht Tour
🔹Kemer City Center
🔹5M Migros (Migros)

➡Antalya, Side:
🔹Manavgat Waterfall
🔹Lake Boat Tour
🔹Ancient Side (Old Town)
🔹Rixos, the "Land of Legends" Shopping Center

➡Pamukkale Trip
➡Fethiye Trip
➡Cappadocia Trips

Write to us! ⤵
WhatsApp & Viber & Telegram
‪+90 552 898 88 99‬`,
      icon: "car"
    },
    {
      title: "VIP Transfer",
      description: `Individual trips to:

➡Pamukkale
➡Fethiye
➡Cappadocia

Premium Vehicles
Professional Drivers
Individual Approach for Each Customer`,
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
            Our{" "}
            <span className="text-red-600">
              Transfers
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We offer you a safe and comfortable travel experience with our special transfer solutions.
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
                Write on WhatsApp
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Special Transfer Request
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Do you have a special transfer request that's not listed in our services?
            Contact us and we'll provide you with a custom solution.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => handleWhatsAppClick("Special Transfer Request")}
              className="btn btn-outline bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Write on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 