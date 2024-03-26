import { getServerSession } from 'next-auth'
import { Octokit } from '@octokit/core'
import { options } from './api/auth/[...nextauth]/options'

export async function getUserGitHubId() {
  const session = await getServerSession(options)
  const accessToken = session?.token

  if (!accessToken) {
    throw new Error('User token not found')
  }

  const octokit = new Octokit({ auth: accessToken })

  try {
    const response = await octokit.request('GET /user')
    const userId = response.data.login
    const userPhoto = response.data.avatar_url
    return {userId, userPhoto}
  } catch (error) {
    console.error('Error fetching user information:', error)
    throw new Error('Failed to fetch user information from GitHub')
  }
}
