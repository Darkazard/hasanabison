'use client'

export default function Transfers() {
  const transferServices = [
    {
      title: "🛍🚕 EINKAUFSTRANSFER ZU DEN GESCHÄFTEN IN ANTALYA",
      description: `🛒 Nutzen Sie unser Auto mit Fahrer für eine bequeme Fahrt zu den Geschäften und Einkaufszentren in Antalya.
  
🏪 Hier sind die Orte für Shopping-Liebhaber, zu denen wir Sie bringen können:
 
1. MarkAntalya (MarkAntalya)
2. Erasta (Erasta)
3. Einkaufszentrum von Antalya
4. ÖzdilekPark (OzdilekPark)
5. Agora (Agora)
6. TerraCity (TerraCity)
7. 5M Migros (Migros)
8. Deepo Outlet (Deepo Outlet) Deepo Outlet 
 
oder andere Geschäfte in Antalya auf Ihre Anfrage🤗.
 
 
📩 Um mehr zu erfahren und eine Reise zu buchen, schreiben Sie an Whatsap!`,
      icon: "shopping-cart"
    },
    {
      title: "SHOPPING-TRANSFER INS LAND DER LEGENDEN",
      description: `keine Zeitbegrenzung. Wir holen Sie zur vereinbarten Zeit von Ihrem Hotel ab und bringen Sie zum Einkaufszentrum. Wir holen Sie zur vereinbarten Zeit vom Einkaufszentrum ab und bringen Sie zum Hotel.

⠀
Öffnungszeiten: täglich von 10.00 bis 22.00 Uhr
‼
Unser Autovermietungsservice mit Fahrer bringt Sie schnell und bequem zu jedem Einkaufszentrum in Antalya. Die Uhrzeit zum Shoppen bestimmst du übrigens selbst!🤝
📲 ‪+90 552 898 88 99‬`,
      icon: "map-marked-alt"
    },
    {
      title: "Einkaufstransfer rund um Kaleici",
      description: `GEHEIME ORTE VON KALEICI
Freunde, wisst ihr, wohin ihr in Antalya gehen sollt? Ich zeige Ihnen drei der interessantesten Orte in der Altstadt. Sparen Sie für die Zukunft, es wird Ihnen nützlich sein!!
__________
👍🇹🇷☀
1. Versteckter Park
Eine kleine Grünanlage versteckt in Kaleici – bietet einen tollen Ausblick auf die gesamte Innenstadt und insbesondere den Hafen. Das Gebiet ist von Grünflächen, Erholungsgebieten, kleinen Brunnen und verschiedenen Holzskulpturen umgeben, die den Park schmücken.
2. Panoramaaufzug
Dieser Aufzug bietet einen bequemen Zugang von der Ebene der Hauptstraße zum Hafen in der Altstadt. Der Blick vom Balkon bietet einen atemberaubenden Panoramablick auf ganz Kaleici, das Meer und den Golf von Antalya.
3. Mermerli-Strand
Der einzige Ort zum Schwimmen in Kaleici. Es ist Teil eines gleichnamigen Restaurants und kann nur vom Restaurant aus erreicht werden. Der Eintritt zum Strand ist gebührenpflichtig. Tolle Aussicht, Restaurantservice, gemütlicher, sauberer Strand mit kristallklarem Wasser.

Liebe Touristen! Wir erinnern Sie daran, dass Sie bei uns einen individuellen Transfer buchen und auch eine individuelle Tour entlang einer Route Ihrer Wahl unternehmen können!`,
      icon: "landmark"
    },
    {
      title: "Stadtrundfahrt durch Antalya",
      description: `EINZIGARTIGES ANGEBOT❗❗❗

Nur bei uns erstmals in Antalya individuelle Ausflugstouren mit einer Dauer von bis zu 8 Stunden. Ein persönliches Premiumauto (bis zu 8 Sitzplätze) steht Ihnen zur Verfügung. Unsere Fahrer bringen Sie zu den wichtigsten Sehenswürdigkeiten von Antalya, warten auf Sie und machen Fotos von Ihnen und Ihrer Begleitung. Wir bringen unsere Touristen nicht in Geschäfte! Alle Programme können Sie selbst anpassen! Die Kosten für jedes Programm betragen 60–150 $ für die gesamte Tour, nicht für jeden einzelnen Touristen! Der Preis variiert je nach Lage Ihres Hotels und dem gewählten Reiseziel.
👇🏼👇🏼👇🏼

➡Antalya,
🔹Duden (Kepez) Wasserfälle
🔹Altstadt Kaleici
🔹Archäologisches Museum
🔹Aquarium
🔹Atatürk-Park
🔹Regenschirmstraße

➡Antalya, Lara
🔹Duden Lara Wasserfälle
🔹Freizeitpark (Rafting)
🔹Schießstand
🔹Quad-Safari
🔹 Seilbahn
🔹 Antalya Marina & Bootstour
🔹 Einkaufszentrum von Antalya

➡Antalya, Kemer:
🔹Canyon in Göynük
🔹Seilbahn
🔹Ulupinar-Wasserfälle
🔹Yachttour
🔹Kemer Stadtzentrum
🔹 5M Migros (Migros)

➡Antalya, Side:
🔹Wasserfall in Manavgat
🔹Bootstour auf dem See
🔹Antike Seite (Altstadt)
🔹 Rixos, das Einkaufszentrum "Land der Legenden"

➡ Pamukkale-Reise
➡ Fethiye-Reise
➡ Kappadokien Reisen

Schreiben Sie uns! ⤵
WhatsApp & Viber & Telegram
‪+90 552 898 88 99‬`,
      icon: "car"
    },
    {
      title: "VIP Transfer",
      description: `Individuelle Reisen nach:

➡ Pamukkale
➡ Fethiye
➡ Kappadokien

Premium-Fahrzeuge
Professionelle Fahrer
Individueller Ansatz für jeden Kunden`,
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
            Unsere{" "}
            <span className="text-red-600">
              Transfers
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Wir bieten Ihnen ein sicheres und komfortables Reiseerlebnis mit unseren speziellen Transferlösungen.
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
                Bei WhatsApp schreiben
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-black p-8 rounded-xl shadow-lg animate-fadeIn">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Spezielle Transferanfrage
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Haben Sie eine spezielle Transferanfrage, die nicht in unseren Dienstleistungen aufgeführt ist?
            Kontaktieren Sie uns und wir bieten Ihnen eine individuelle Lösung.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => handleWhatsAppClick("Spezielle Transferanfrage")}
              className="btn btn-outline bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Bei WhatsApp schreiben
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 