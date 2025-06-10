export interface Resume {
  basics?: {
    name?: string
    label?: string
    email?: string
    phone?: string
    website?: string
    summary?: string
    location?: {
      address?: string
      city?: string
      region?: string
      postalCode?: string
      countryCode?: string
    }
    profiles?: Array<{
      network?: string
      username?: string
      url?: string
    }>
  }
  work?: Array<{
    company?: string
    position?: string
    website?: string
    startDate?: string
    endDate?: string
    summary?: string
    highlights?: string[]
  }>
  education?: Array<{
    institution?: string
    area?: string
    studyType?: string
    startDate?: string
    endDate?: string
    gpa?: string
    courses?: string[]
  }>
  skills?: Array<{
    name?: string
    level?: string
    keywords?: string[]
  }>
  // Add other resume sections as needed
  [key: string]: any
}
