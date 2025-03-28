import { create } from 'zustand'

interface Step1Data {
  from: string
  to: string
  date: string
  time: string
  passengers: number
  roundTrip: boolean
  returnDate?: string
  returnTime?: string
}

interface Step2Data {
  vehicle: string
  extras: string[]
}

interface PersonalInfo {
  name: string
  surname: string
  phone: string
}

interface ReservationStore {
  step1Data: Step1Data | null
  step2Data: Step2Data | null
  personalInfo: PersonalInfo | null
  setStep1Data: (data: Step1Data) => void
  setStep2Data: (data: Step2Data) => void
  setPersonalInfo: (data: PersonalInfo) => void
  resetStore: () => void
}

export const useReservationStore = create<ReservationStore>()((set) => ({
  step1Data: null,
  step2Data: null,
  personalInfo: null,
  setStep1Data: (data) => set({ step1Data: data }),
  setStep2Data: (data) => set({ step2Data: data }),
  setPersonalInfo: (data) => set({ personalInfo: data }),
  resetStore: () => set({ step1Data: null, step2Data: null, personalInfo: null }),
})) 