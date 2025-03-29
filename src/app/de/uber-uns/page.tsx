export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-red-600">
              Über Uns
            </span>
          </h1>
          <p className="text-xl text-white">
            Seit 2013 bieten wir zuverlässige und komfortable Transferdienste an
          </p>
        </div>

        <div className="bg-black backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 p-8 mb-20">
          <div className="prose prose-lg prose-invert mx-auto">
            <div className="text-white space-y-6">
              <p>
                Seit 2013 bietet Start Holiday VIP Transfer luxuriöse und komfortable Transportdienste in Antalya an. Jahr für Jahr verbessern wir unsere Servicequalität durch wertvolles Feedback unserer Gäste und die engagierte Arbeit unseres professionellen Teams.
              </p>
              
              <p>
                Wir bieten unseren Gästen nicht nur Transferdienste an, sondern möchten unvergessliche Reiseerlebnisse schaffen. Zu unseren speziellen Dienstleistungen mit VIP-Minibussen gehören:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Flughafen - Hotel Transfers: Wir bringen Sie komfortabel und sicher an Ihr Ziel.</li>
                <li>Shopping-Touren: Wir bieten speziellen VIP-Transport zu den prestigeträchtigsten Einkaufszentren Antalyas wie Mall of Antalya, Terracity, Mark Antalya usw.</li>
                <li>Antalya Stadt, Kemer, Side, Manavgat, Alanya, Dimçayı, Kaş, Fethiye, Ölüdeniz, Saklıkent Fethiye: Wir bieten spezielle Routen für unsere Gäste, die die natürlichen und historischen Schönheiten von Antalya und Umgebung entdecken möchten.</li>
                <li>St. Nikolaus Kirche Besuch: Eine Kirche, die nach dem Tod des Heiligen Nikolaus in Demre erbaut wurde, der als Weihnachtsmann bekannt ist. Es wird angenommen, dass der Weihnachtsmann nach seinem Tod eine Zeit lang hier lag und seine Überreste später von italienischen Seeleuten nach Bari gebracht wurden.</li>
              </ul>

              <p>
                <strong className="text-white">Spezielle VIP-Touren:</strong> Sie können Ihr eigenes Programm erstellen und in Begleitung unserer professionellen Fahrer ein einzigartiges Erlebnis genießen.
              </p>

              <p className="text-xl font-semibold text-white text-center mt-8">
                Wir sind hier, um Ihre Reise in Antalya mit unseren Dienstleistungen, die Luxus, Komfort und Sicherheit vereinen, unvergesslich zu machen!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 