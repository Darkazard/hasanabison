import { redirect } from 'next/navigation'
import ReservationForm from '@/components/Reservation/ReservationForm'

export default function Home() {
  // Varsayılan olarak Türkçe sayfaya yönlendir
  redirect('/anasayfa')
}

