export interface Booking {
  id?: string;
  created_at?: string;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  preferred_date: string;
  message: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}
