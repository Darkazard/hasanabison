import { translations } from '@/translations'

interface EuroPriceListProps {
  prices: {
    basePrice: number;
    vehiclePrice: number;
    extrasTotal: number;
    totalPrice: number;
    isRoundTrip: boolean;
  };
  selectedExtras: { name: string; price: number }[];
}

export default function EuroPriceList({ prices, selectedExtras }: EuroPriceListProps) {
  const t = translations.de;

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">{t.priceSummary}</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-300">
          <span>{t.routePrice}:</span>
          <span className="font-medium">€{prices.basePrice}</span>
        </div>
        <div className="flex justify-between items-center text-gray-300">
          <span>{t.vehiclePrice}:</span>
          <span className="font-medium">€{prices.vehiclePrice}</span>
        </div>
        {prices.isRoundTrip && (
          <div className="flex justify-between items-center text-green-400">
            <span>{t.roundTripDiscount}:</span>
            <span className="font-medium">-€5</span>
          </div>
        )}
        {prices.extrasTotal > 0 && (
          <>
            <div className="pt-2 border-t border-gray-700">
              <div className="text-sm font-medium text-gray-400 mb-2">{t.selectedExtras}:</div>
              {selectedExtras.map((extra, idx) => (
                <div key={idx} className="flex justify-between items-center text-gray-300 text-sm">
                  <span>{extra.name}</span>
                  <span>+€{extra.price}</span>
                </div>
              ))}
              <div className="flex justify-between items-center text-gray-300 mt-2 pt-2 border-t border-gray-700">
                <span>{t.extrasTotal}:</span>
                <span className="font-medium">+€{prices.extrasTotal}</span>
              </div>
            </div>
          </>
        )}
        <div className="pt-4 mt-4 border-t-2 border-gray-700">
          <div className="flex justify-between items-center text-xl">
            <span className="font-bold text-white">{t.totalPrice}:</span>
            <span className="font-bold text-red-500">€{prices.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 