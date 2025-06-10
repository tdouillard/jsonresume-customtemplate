import { $fetch } from 'ofetch'
import type { Resume } from '../types/resume'

export const renderResume = async (resume: Resume) => {
  // In Nuxt.js, you'll likely want to use the API routes
  const { data } = await $fetch('/api/resume/render', {
    method: 'POST',
    body: { resume }
  })
  
  return data
}
