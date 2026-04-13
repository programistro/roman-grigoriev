// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Схемы для переиспользования
const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error']).optional()
})

const createImageSchema = () => z.object({
  src: z.string(),
  alt: z.string()
})

export default defineContentConfig({
  collections: {
    // Главная страница
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        seo: z.object({
          title: z.string(),
          description: z.string()
        }),
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema())
        }),
        about: z.object({
          title: z.string(),
          description: z.string()
        }),
        testimonials: z.array(z.object({
          quote: z.string(),
          author: z.object({
            name: z.string(),
            description: z.string(),
            avatar: createImageSchema()
          })
        })),
        blog: z.object({
          title: z.string(),
          description: z.string()
        })
      })
    }),
    
    // Проекты
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        url: z.string(),
        tags: z.array(z.string()),
        date: z.date()
      })
    }),
    
    // Блог
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        image: z.string(),
        author: z.object({
          name: z.string(),
          avatar: createImageSchema().optional()
        })
      })
    })
  }
})