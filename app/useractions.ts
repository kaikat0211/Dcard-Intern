import { getServerSession } from 'next-auth'
import { Octokit } from '@octokit/core'
import { options } from './api/auth/[...nextauth]/options'
import { CustomSession } from './types/userTypes'

export async function getUserGitHubId() {
  const session = await getServerSession(options)
  if(!session) return false

  const accessToken = (session as CustomSession)?.token

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
