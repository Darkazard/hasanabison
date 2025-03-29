import { translations } from '@/translations';

export default function ReservationForm() {
  const t = translations.en;

  {/* Video Section */}
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">{t.whoAreWe}</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="aspect-square">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/your-video-id-1"
          title="Start Holiday VIP Transfer Video 1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="aspect-square">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/your-video-id-2"
          title="Start Holiday VIP Transfer Video 2"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="aspect-square">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/your-video-id-3"
          title="Start Holiday VIP Transfer Video 3"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="aspect-square">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/your-video-id-4"
          title="Start Holiday VIP Transfer Video 4"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div> 
} 