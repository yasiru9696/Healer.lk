import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  duration_minutes: number;
  price: number;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
};

export type Booking = {
  id?: string;
  service_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  appointment_date: string;
  appointment_time: string;
  notes: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: 'ayurveda' | 'yoga' | 'sound-healing' | 'meditation' | 'wellness';
  tags: string[];
  published_at: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_title: string;
  testimonial: string;
  rating: number;
  image_url: string | null;
  video_url: string | null;
  is_featured: boolean;
};

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};
