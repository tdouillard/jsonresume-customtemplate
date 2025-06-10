<template>
  <div>
    <h1>Resume Renderer</h1>
    <div v-if="renderedResume" v-html="renderedResume.html"></div>
  </div>
</template>

<script setup lang="ts">
import type { Resume } from '~/types/resume'

// Your index.ts logic goes here
const renderedResume = ref(null)

onMounted(async () => {
  // Example resume data
  const resume: Resume = {
    // your resume data
  }
  
  try {
    const result = await $fetch('/api/resume/render', {
      method: 'POST',
      body: { resume }
    })
    renderedResume.value = result
  } catch (error) {
    console.error('Failed to render resume:', error)
  }
})
</script>