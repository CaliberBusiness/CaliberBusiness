import { MetadataRoute } from 'next';

// next.config.js sets `trailingSlash: true`, so every canonical URL must end
// with a slash — otherwise each sitemap entry 308-redirects and Google drops it.
const baseUrl = 'https://www.caliberbusinessresource.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy-policy/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-of-use/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}
