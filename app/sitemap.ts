import getRandomIssues from '@/lib/Issues/fetchRandomIssues'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const issues = await getRandomIssues()
    const issuesEntries : MetadataRoute.Sitemap = issues!.map((issue) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${issue.node.repository.nameWithOwner}/issues/${issue.node.number}`,
        lastModified: `${issue.node.updatedAt}`,
        priority: 0.5
    }))
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/issues`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
  ]
}