import { defineEventHandler, readBody, createError } from 'h3'
import { renderResume } from '../../../lib/renderResume'
import type { Resume } from '../../../types/resume'

const handleResumeRender = defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { resume } = body as { resume: Resume }
  
  if (!resume) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Resume data is required'
    })
  }
  
  try {
    const result = renderResume(resume)
    return {
      success: true,
      data: result
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to render resume'
    })
  }
})

export default handleResumeRender
