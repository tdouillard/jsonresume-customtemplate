import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Handlebars from 'handlebars'

// For ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Resume {
  [key: string]: any
}

interface RenderResult {
  html: string
  css: string
}

function render(resume: Resume): string {
  const css = readFileSync(join(__dirname, 'style.css'), 'utf-8')
  const tpl = readFileSync(join(__dirname, 'resume.hbs'), 'utf-8')
  const partialsDir = join(__dirname, 'partials')
  
  try {
    const filenames = readdirSync(partialsDir)
    
    filenames.forEach((filename: string) => {
      const matches = /^([^.]+)\.hbs$/.exec(filename)
      if (!matches) {
        return
      }
      const name = matches[1]
      const filepath = join(partialsDir, filename)
      const template = readFileSync(filepath, 'utf8')
      
      Handlebars.registerPartial(name, template)
    })
  } catch (error) {
    console.warn('Partials directory not found or empty:', partialsDir)
  }
  
  return Handlebars.compile(tpl)({
    css,
    resume
  })
}

function renderResume(resume: Resume): RenderResult {
  const css = readFileSync(join(__dirname, 'style.css'), 'utf-8')
  const tpl = readFileSync(join(__dirname, 'resume.hbs'), 'utf-8')
  const partialsDir = join(__dirname, 'partials')
  
  try {
    const filenames = readdirSync(partialsDir)
    
    filenames.forEach((filename: string) => {
      const matches = /^([^.]+)\.hbs$/.exec(filename)
      if (!matches) {
        return
      }
      const name = matches[1]
      const filepath = join(partialsDir, filename)
      const template = readFileSync(filepath, 'utf8')
      
      Handlebars.registerPartial(name, template)
    })
  } catch (error) {
    console.warn('Partials directory not found or empty:', partialsDir)
  }
  
  const html = Handlebars.compile(tpl)({ resume })
  
  return { html, css }
}

export { render, renderResume }
export default { render, renderResume }
