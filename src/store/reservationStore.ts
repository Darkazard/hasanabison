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

interface Step3Data {
  name: string
  surname: string
  phone: string
  email: string
  flightNumber: string
  pickupTime: string
  paymentMethod: string
}

interface PersonalInfo {
  name: string
  surname: string
  phone: string
}

interface ReservationStore {
  step1Data: Step1Data | null
  step2Data: Step2Data | null
  step3Data: Step3Data | null
  personalInfo: PersonalInfo | null
  currentStep: number
  setStep1Data: (data: Step1Data) => void
  setStep2Data: (data: Step2Data) => void
  setStep3Data: (data: Step3Data) => void
  setPersonalInfo: (data: PersonalInfo) => void
  setCurrentStep: (step: number) => void
  resetStore: () => void
}

export const useReservationStore = create<ReservationStore>()((set) => ({
  step1Data: null,
  step2Data: null,
  step3Data: null,
  personalInfo: null,
  currentStep: 1,
  setStep1Data: (data) => set({ step1Data: data }),
  setStep2Data: (data) => set({ step2Data: data }),
  setStep3Data: (data) => set({ step3Data: data }),
  setPersonalInfo: (data) => set({ personalInfo: data }),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetStore: () => set({ step1Data: null, step2Data: null, step3Data: null, personalInfo: null, currentStep: 1 }),
})) 