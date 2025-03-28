"use client";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
}

export default function PricingPage() {
  const params = useParams();
  const t = useTranslations("Pricing");
  const [isVisible, setIsVisible] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }

    return () => {
      if (pricingRef.current) {
        observer.unobserve(pricingRef.current);
      }
    };
  }, []);

  const pricingData: PricingPlan[] = [
    {
      name: t("economy.name"),
      price: t("economy.price"),
      features: [
        t("economy.features.1"),
        t("economy.features.2"),
        t("economy.features.3"),
        t("economy.features.4"),
        t("economy.features.5"),
        t("economy.features.6"),
        t("economy.features.7"),
        t("economy.features.8"),
        t("economy.features.9"),
        t("economy.features.10"),
      ],
    },
    {
      name: t("comfort.name"),
      price: t("comfort.price"),
      features: [
        t("comfort.features.1"),
        t("comfort.features.2"),
        t("comfort.features.3"),
        t("comfort.features.4"),
        t("comfort.features.5"),
        t("comfort.features.6"),
        t("comfort.features.7"),
        t("comfort.features.8"),
        t("comfort.features.9"),
        t("comfort.features.10"),
      ],
    },
    {
      name: t("luxury.name"),
      price: t("luxury.price"),
      features: [
        t("luxury.features.1"),
        t("luxury.features.2"),
        t("luxury.features.3"),
        t("luxury.features.4"),
        t("luxury.features.5"),
        t("luxury.features.6"),
        t("luxury.features.7"),
        t("luxury.features.8"),
        t("luxury.features.9"),
        t("luxury.features.10"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-300 text-center mb-12">
          {t("title")}
        </h1>
        <div ref={pricingRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingData.map((plan: PricingPlan, index: number) => (
            <div
              key={plan.name}
              className={`bg-gradient-to-br from-amber-900/80 to-amber-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-amber-700/50 transform transition-all duration-500 hover:scale-105 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <h2 className="text-2xl font-bold text-amber-300 mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold text-amber-200 mb-6">{plan.price}</p>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-amber-100/90">
                    <span className="text-amber-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 