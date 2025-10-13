/*
  # Dr. Umesha Dilhara - The Healer Website Schema

  ## Overview
  Complete database schema for a holistic healing practice website featuring:
  - Service catalog (Ayurveda, Yoga, Sound Healing, Meditation)
  - Appointment booking system with calendar integration
  - Blog/tips content management
  - Client testimonials with moderation
  - Contact form submissions

  ## New Tables

  ### 1. `services`
  Core healing services offered by Dr. Umesha
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `title` (text) - Service name
  - `description` (text) - Detailed description
  - `short_description` (text) - Brief summary for cards
  - `duration_minutes` (integer) - Session length
  - `price` (decimal) - Cost in LKR
  - `image_url` (text) - Service hero image
  - `is_active` (boolean) - Published status
  - `sort_order` (integer) - Display order
  - `created_at`, `updated_at` (timestamptz)

  ### 2. `bookings`
  Appointment reservation system
  - `id` (uuid, primary key)
  - `service_id` (uuid, foreign key to services)
  - `client_name` (text)
  - `client_email` (text)
  - `client_phone` (text)
  - `appointment_date` (date)
  - `appointment_time` (time)
  - `notes` (text) - Client notes/special requests
  - `status` (text) - pending/confirmed/cancelled/completed
  - `created_at`, `updated_at` (timestamptz)

  ### 3. `blog_posts`
  Tips, articles, and guidance content
  - `id` (uuid, primary key)
  - `slug` (text, unique)
  - `title` (text)
  - `excerpt` (text) - Brief summary
  - `content` (text) - Full article (markdown)
  - `featured_image` (text)
  - `category` (text) - ayurveda/yoga/sound-healing/meditation
  - `tags` (text[]) - Array of tag strings
  - `is_published` (boolean)
  - `published_at` (timestamptz)
  - `created_at`, `updated_at` (timestamptz)

  ### 4. `testimonials`
  Client reviews and success stories
  - `id` (uuid, primary key)
  - `client_name` (text)
  - `client_title` (text) - Optional job/description
  - `testimonial` (text) - Review content
  - `rating` (integer) - 1-5 stars
  - `service_id` (uuid, nullable, foreign key)
  - `image_url` (text, nullable) - Client photo
  - `video_url` (text, nullable) - Video testimonial
  - `is_featured` (boolean)
  - `is_approved` (boolean) - Moderation flag
  - `created_at` (timestamptz)

  ### 5. `contact_submissions`
  Contact form messages
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text, nullable)
  - `subject` (text)
  - `message` (text)
  - `is_read` (boolean)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for published content (services, posts, testimonials)
  - Authenticated write access for admin functions
  - Public insert for bookings and contact submissions (rate-limited via app)

  ## Indexes
  Performance indexes on commonly queried fields:
  - Service and post slugs for fast lookups
  - Booking dates for calendar queries
  - Published status for filtered lists
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  price decimal(10,2) NOT NULL DEFAULT 0,
  image_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  notes text DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  category text NOT NULL CHECK (category IN ('ayurveda', 'yoga', 'sound-healing', 'meditation', 'wellness')),
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_title text DEFAULT '',
  testimonial text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  image_url text,
  video_url text,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved) WHERE is_approved = true;

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services (public read, admin write)
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for bookings (public insert, admin manage)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for blog_posts (public read published, admin manage)
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for testimonials (public read approved, admin manage)
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Anyone can submit testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for contact_submissions (public insert, admin read)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial services data
INSERT INTO services (slug, title, short_description, description, duration_minutes, price, sort_order, is_active) VALUES
('ayurveda', 'Ayurveda Treatment', 'Ancient holistic healing for mind, body, and spirit', 'Personalized Ayurvedic consultations and treatments tailored to your unique constitution (Prakriti). Experience traditional healing methods including herbal remedies, dietary guidance, and lifestyle recommendations to restore balance and promote optimal health.', 90, 8000, 1, true),
('yoga', 'Yoga Practice', 'Restorative movement and mindful breathing', 'Guided yoga sessions for all levels, from beginners to advanced practitioners. Learn proper alignment, breathing techniques, and mindful movement to enhance flexibility, strength, and inner peace. Private and group classes available.', 60, 5000, 2, true),
('sound-healing', 'Sound Healing', 'Transformative vibrational therapy with singing bowls', 'Deep relaxation and healing through the therapeutic vibrations of Tibetan singing bowls, gongs, and other sacred instruments. Experience cellular-level healing, stress relief, and profound meditation states through sound frequency therapy.', 75, 6500, 3, true),
('meditation', 'Buddhist Meditation', 'Guided mindfulness and compassion practices', 'Learn authentic Buddhist meditation techniques rooted in mindfulness (Vipassana) and loving-kindness (Metta) practices. Suitable for beginners and experienced meditators seeking deeper insight, emotional balance, and spiritual growth.', 60, 4000, 4, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, category, tags, is_published, published_at) VALUES
('understanding-your-dosha', 'Understanding Your Dosha: A Guide to Ayurvedic Constitution', 'Discover your unique mind-body type and how to maintain balance', '# Understanding Your Dosha\n\nIn Ayurveda, your dosha represents your unique constitution—the blueprint of your physical, mental, and emotional characteristics...\n\n## The Three Doshas\n\n- **Vata** (Air + Space): Movement, creativity, communication\n- **Pitta** (Fire + Water): Transformation, intelligence, metabolism\n- **Kapha** (Earth + Water): Structure, stability, nourishment\n\nUnderstanding your primary dosha helps you make lifestyle choices that maintain health and prevent imbalance.', 'ayurveda', ARRAY['dosha', 'constitution', 'balance'], true, now()),

('morning-yoga-routine', '10-Minute Morning Yoga Routine for Energy', 'Start your day with gentle movement and breath', '# Morning Yoga Flow\n\nBegin each day with intention and movement. This simple 10-minute sequence awakens your body and centers your mind...\n\n## The Sequence\n\n1. **Mountain Pose** (Tadasana) - 1 minute\n2. **Sun Salutation A** - 3 rounds\n3. **Warrior II** - 1 minute each side\n4. **Child''s Pose** - 2 minutes\n\nPractice daily for increased energy and mental clarity.', 'yoga', ARRAY['morning-routine', 'energy', 'beginner'], true, now()),

('power-of-sound-healing', 'The Science Behind Sound Healing', 'How vibrational therapy affects your body and mind', '# Sound Healing: Ancient Wisdom Meets Modern Science\n\nSound healing isn''t just spiritual practice—it''s backed by neuroscience...\n\n## How It Works\n\nWhen singing bowls are played, they create specific frequencies that:\n- Slow brain wave patterns to meditative states\n- Reduce cortisol (stress hormone)\n- Promote cellular healing\n- Balance the nervous system\n\nExperience the profound effects in your first session.', 'sound-healing', ARRAY['science', 'frequency', 'therapy'], true, now()),

('mindfulness-meditation-basics', 'Mindfulness Meditation for Beginners', 'Simple steps to start your meditation practice', '# Getting Started with Mindfulness\n\nMeditation doesn''t require special equipment or years of practice—just willingness to begin...\n\n## Basic Technique\n\n1. Find a comfortable seated position\n2. Set a timer for 5-10 minutes\n3. Focus on your natural breath\n4. When mind wanders, gently return attention to breath\n5. End with gratitude\n\nConsistency matters more than duration. Start small and build your practice gradually.', 'meditation', ARRAY['mindfulness', 'beginner', 'practice'], true, now())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_title, testimonial, rating, is_approved, is_featured) VALUES
('Nimali Perera', 'Teacher, Colombo', 'Dr. Umesha''s Ayurvedic treatment transformed my chronic digestive issues. After years of modern medicine, his holistic approach finally brought lasting relief. Highly recommended!', 5, true, true),
('Roshan Silva', 'IT Professional', 'The sound healing sessions are incredible. I was skeptical at first, but the deep relaxation and mental clarity I experience are undeniable. Best stress relief I''ve found.', 5, true, true),
('Amara Fernando', 'Yoga Instructor', 'Learning from Dr. Umesha has deepened my own yoga practice immensely. His knowledge of alignment and breath work is exceptional. Grateful for his guidance.', 5, true, false),
('Kasun Rajapaksa', 'Business Owner', 'The meditation sessions helped me manage anxiety and find balance during difficult times. Dr. Umesha creates a safe, supportive space for healing.', 5, true, true)
ON CONFLICT DO NOTHING;