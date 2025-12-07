import type { Service } from '../lib/supabase';

// Base URL for the website
export const SITE_URL = 'https://healer.lk';
export const SITE_NAME = 'Dr. Umesha Dilhara - The Healer';
export const BUSINESS_NAME = 'The Healer - Holistic Healing & Ayurvedic Wellness';

// Organization/LocalBusiness Schema
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
    "@id": `${SITE_URL}/#organization`,
    "name": BUSINESS_NAME,
    "alternateName": "The Healer",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": `${SITE_URL}/og-image.jpg`,
    "description": "Traditional Ayurvedic healing, Yoga therapy, Sound healing with Bhajans, and Buddhist meditation practices led by Dr. Umesha Dilhara. Ancient wisdom meets modern healing for holistic wellness.",
    "priceRange": "LKR 2,500 - LKR 8,000",
    "telephone": "+94-XX-XXX-XXXX",
    "email": "info@healer.lk",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "LK",
        "addressLocality": "Colombo",
        "addressRegion": "Western Province"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "6.9271",
        "longitude": "79.8612"
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "14:00"
        }
    ],
    "sameAs": [
        // Add social media profiles here when available
        // "https://www.facebook.com/healer.lk",
        // "https://www.instagram.com/healer.lk"
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Healing Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Ayurvedic Healing & Consultation",
                    "description": "Traditional Ayurvedic treatments tailored to balance your doshas"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Yoga Therapy",
                    "description": "Personalized yoga sessions for flexibility, strength, and mental clarity"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Sound Healing with Bhajans",
                    "description": "Therapeutic sound vibrations for deep relaxation and spiritual connection"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Buddhist Meditation",
                    "description": "Mindfulness practices to reduce stress and enhance inner peace"
                }
            }
        ]
    }
});

// Physician/Person Schema
export const getPhysicianSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    "name": "Dr. Umesha Dilhara",
    "alternateName": "The Healer",
    "url": SITE_URL,
    "image": `${SITE_URL}/doctor-profile.jpg`,
    "jobTitle": "Ayurvedic Practitioner & Holistic Healer",
    "description": "Certified Ayurvedic physician with over 15 years of experience in traditional healing arts, specializing in Ayurveda, Yoga therapy, Sound healing, and Buddhist meditation.",
    "knowsAbout": [
        "Ayurvedic Medicine",
        "Yoga Therapy",
        "Sound Healing",
        "Buddhist Meditation",
        "Panchakarma",
        "Marma Therapy",
        "Pranayama"
    ],
    "hasCredential": [
        {
            "@type": "EducationalOccupationalCredential",
            "name": "Bachelor of Ayurvedic Medicine & Surgery (BAMS)",
            "credentialCategory": "degree"
        },
        {
            "@type": "EducationalOccupationalCredential",
            "name": "Yoga Alliance Certified Instructor (RYT-500)",
            "credentialCategory": "certification"
        },
        {
            "@type": "EducationalOccupationalCredential",
            "name": "Sound Healing Practitioner Certification",
            "credentialCategory": "certification"
        },
        {
            "@type": "EducationalOccupationalCredential",
            "name": "Buddhist Meditation Teacher Training",
            "credentialCategory": "certification"
        }
    ],
    "worksFor": {
        "@id": `${SITE_URL}/#organization`
    },
    "medicalSpecialty": [
        "Ayurvedic Medicine",
        "Holistic Medicine",
        "Integrative Medicine"
    ]
});

// Service Schema Generator
export const getServiceSchema = (service: Service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service-${service.slug}`,
    "serviceType": service.title,
    "name": service.title,
    "description": service.short_description,
    "provider": {
        "@id": `${SITE_URL}/#organization`
    },
    "offers": {
        "@type": "Offer",
        "price": service.price.toString(),
        "priceCurrency": "LKR",
        "availability": "https://schema.org/InStock",
        "url": `${SITE_URL}/#services`,
        "priceValidUntil": new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split('T')[0]
    },
    "areaServed": {
        "@type": "Country",
        "name": "Sri Lanka"
    }
});

// Review/AggregateRating Schema
export const getReviewSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "200",
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Sarah M."
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "reviewBody": "Dr. Umesha's holistic approach transformed my chronic pain. The combination of Ayurvedic treatment and yoga therapy brought relief I hadn't experienced in years."
        },
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "John R."
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
            },
            "reviewBody": "The sound healing sessions are incredibly powerful. I've found peace and balance that modern medicine couldn't provide."
        }
    ]
});

// BreadcrumbList Schema
export const getBreadcrumbSchema = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": `${SITE_URL}/#about`
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Services",
            "item": `${SITE_URL}/#services`
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "Testimonials",
            "item": `${SITE_URL}/#testimonials`
        },
        {
            "@type": "ListItem",
            "position": 5,
            "name": "Contact",
            "item": `${SITE_URL}/#contact`
        }
    ]
});

// WebSite Schema with SearchAction
export const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": SITE_NAME,
    "description": "Traditional Ayurvedic healing, Yoga therapy, Sound healing, and Buddhist meditation in Sri Lanka",
    "publisher": {
        "@id": `${SITE_URL}/#organization`
    },
    "inLanguage": "en-US"
});

// FAQ Schema (optional, can be added if you have FAQs)
export const getFAQSchema = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is Ayurvedic healing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ayurvedic healing is a traditional Indian system of medicine that focuses on balancing the body's doshas (Vata, Pitta, Kapha) through personalized treatments, herbal remedies, diet, and lifestyle adjustments."
            }
        },
        {
            "@type": "Question",
            "name": "What services do you offer?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer Ayurvedic healing consultations, Panchakarma treatments, Yoga therapy, Sound healing with Bhajans, Buddhist meditation, Marma therapy, and Pranayama breathwork sessions."
            }
        },
        {
            "@type": "Question",
            "name": "How long is a typical session?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Session durations vary by service: Meditation (30 min), Sound Healing (45 min), Ayurvedic Consultation (60 min), Yoga Therapy (75 min), to Panchakarma (120 min)."
            }
        }
    ]
});
