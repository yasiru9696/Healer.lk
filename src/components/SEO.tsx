import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME } from '../utils/schemas';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
}

export default function SEO({
    title = 'Dr. Umesha Dilhara - The Healer | Ayurvedic Healing & Holistic Wellness in Sri Lanka',
    description = 'Experience authentic Ayurvedic healing, Yoga therapy, Sound healing with Bhajans, and Buddhist meditation with Dr. Umesha Dilhara. Traditional wisdom meets modern wellness in Sri Lanka.',
    keywords = 'ayurveda Sri Lanka, ayurvedic doctor, yoga therapy, sound healing, Buddhist meditation, panchakarma, holistic healing, traditional medicine, Dr. Umesha Dilhara, The Healer, wellness Sri Lanka, ayurvedic consultation, marma therapy, pranayama, bhajan',
    image = `${SITE_URL}/og-image.jpg`,
    url = SITE_URL,
    type = 'website',
    author = 'Dr. Umesha Dilhara'
}: SEOProps) {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Additional Meta Tags */}
            <meta name="theme-color" content="#14b8a6" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="format-detection" content="telephone=no" />
        </Helmet>
    );
}
