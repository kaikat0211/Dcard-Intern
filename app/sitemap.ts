import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dcard-intern.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://dcard-intern.vercel.app/issues',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]
}