import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase, type Service } from '../lib/supabase';
import {
    getOrganizationSchema,
    getPhysicianSchema,
    getServiceSchema,
    getReviewSchema,
    getBreadcrumbSchema,
    getWebSiteSchema,
    getFAQSchema
} from '../utils/schemas';

export default function StructuredData() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase
                .from('services')
                .select('*')
                .eq('is_active', true)
                .order('sort_order');

            if (data && data.length > 0) {
                setServices(data);
            }
        }
        fetchServices();
    }, []);

    // Generate service schemas
    const serviceSchemas = services.map(service => getServiceSchema(service));

    // Combine all schemas
    const allSchemas = [
        getOrganizationSchema(),
        getPhysicianSchema(),
        getReviewSchema(),
        getBreadcrumbSchema(),
        getWebSiteSchema(),
        getFAQSchema(),
        ...serviceSchemas
    ];

    return (
        <Helmet>
            {allSchemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
}
