'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type TripType = 'one-way' | 'round-trip';

interface TripTypeContextType {
  tripType: TripType;
  setTripType: (type: TripType) => void;
}

const TripTypeContext = createContext<TripTypeContextType | undefined>(undefined);

export function TripTypeProvider({ children }: { children: React.ReactNode }) {
  const [tripType, setTripType] = useState<TripType>('one-way');

  useEffect(() => {
    // Step1'den gelen trip type'ı kontrol et
    const savedStep1 = localStorage.getItem('reservationStep1');
    if (savedStep1) {
      const parsedData = JSON.parse(savedStep1);
      if (parsedData.tripType) {
        setTripType(parsedData.tripType);
      }
    }
  }, []);

  return (
    <TripTypeContext.Provider value={{ tripType, setTripType }}>
      {children}
    </TripTypeContext.Provider>
  );
}

export function useTripType() {
  const context = useContext(TripTypeContext);
  if (context === undefined) {
    throw new Error('useTripType must be used within a TripTypeProvider');
  }
  return context;
} 