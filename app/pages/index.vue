<template>
  <div>
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.hero.links"
    >
      <template #links>
        <UButton
          v-for="(link, index) in page.hero.links"
          :key="index"
          v-bind="link"
        />
      </template>
    </UPageHero>

    <UMarquee
      v-if="page.hero.images?.length"

      class="py-2 -mx-8 sm:-mx-12 lg:-mx-0 [--duration:40s]"
    >
      <Motion
        v-for="(img, index) in page.hero.images"
        :key="index"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="320"
          height="180"
          class="rounded-lg aspect-video object-contain"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee>

    <UPageSection
      v-if="page.about"
      id="about"
      :title="page.about.title"
      :description="page.about.description"
      class="py-0"
    />

    <UMarquee class="[--duration:30s]">
      <Motion
        v-for="(img, index) in page.hero.skills"
        :key="index"
        class="mr-0 inline-flex"
        :initial="{
          scale: 1.1, opacity: 0, filter: 'blur(20px)'
        }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
        :transition="{ duration: 0.6, delay: index * 0.1 }"
      >
        <UButton
          :icon="img.icon || 'i-lucide-code'"
          :label="img.name"
          color="neutral"
          variant="outline"
        />
      </Motion>
    </UMarquee>

    <UMarquee
      class="py-4 -mx-8 sm:-mx-12 lg:-mx-0 [--duration:30s]"
      reverse
    >
      <Motion
        v-for="(img, index) in page.hero.skills"
        :key="`rev-${index}`"
        class="mr-0 inline-flex"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: index * 0.1
        }"
      >
        <UButton
          :icon="img.icon || 'i-lucide-code'"
          :label="img.name"
          color="neutral"
          variant="outline"
        />
      </Motion>
    </UMarquee>

    <UPageSection
      v-if="page.experience"
      id="experience"
      :title="page.experience.title"
      class="py-0"
    >
      <div class="space-y-4">
        <div
          v-for="(item, index) in page.experience.items"
          :key="index"
          class="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <UButton
            v-if="item.company.logo?.startsWith('i-')"
            :icon="item.company.logo"
            color="primary"
            variant="soft"
            size="lg"
          />
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 dark:text-gray-100">
              {{ item.position }}
              <NuxtLink
                v-if="item.company.url"
                :to="item.company.url"
                target="_blank"
                class="text-primary-500 hover:underline ml-2"
              >
                {{ item.company.name }}
              </NuxtLink>
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ item.date }}
            </p>
          </div>
        </div>
      </div>
    </UPageSection>

    <UPageSection
      v-if="page.testimonials?.length"
      id="testimonials"
      title="Отзывы"
    >
      <UCarousel
        v-slot="{ item }"
        :items="page.testimonials"
        :autoplay="{ delay: 4000 }"
        loop
        dots
      >
        <UPageCTA
          :description="item.quote"
          variant="naked"
          class="rounded-none"
          :ui="{
            container: 'sm:py-12 lg:py-12 sm:gap-8',
            description: 'text-2xl! text-balance before:content-[open-quote] before:text-5xl lg:before:text-7xl before:inline-block before:text-dimmed before:absolute before:-ml-6 lg:before:-ml-10 before:-mt-2 lg:before:-mt-4 after:content-[close-quote] after:text-5xl lg:after:text-7xl after:inline-block after:text-dimmed after:absolute after:mt-1 lg:after:mt-0 after:ml-1 lg:after:ml-2'
          }"
        >
          <UUser
            :name="item.author.name"
          />
        </UPageCTA>
      </UCarousel>
    </UPageSection>

    <UPageSection
      v-if="page.testimonials?.length"
      id="contact"
      title="Связаться со мной"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Контакты -->
        <div class="space-y-4 text-center">
          <p class="text-gray-600 dark:text-gray-400 whitespace-pre-line">
            Коннект со мной
          </p>

          <div class="space-y-3">
            <UButton
              label="Email"
              icon="i-lucide-mail"
              to="mailto:r.grigorev1502@gmail.com"
              target="_blank"
              color="primary"
              variant="outline"
              size="lg"
              class="mx-auto w-full max-w-xs"
            />
            <br>
            <UButton
              label="Telegram"
              icon="i-simple-icons-telegram"
              to="https://t.me/redmarci"
              target="_blank"
              color="primary"
              variant="outline"
              size="lg"
              class="mx-auto w-full max-w-xs"
            />
            <br>
            <UButton
              label="GitHub"
              icon="i-simple-icons-github"
              to="https://github.com/programistro"
              target="_blank"
              color="neutral"
              variant="outline"
              size="lg"
              class="mx-auto w-full max-w-xs"
            />
          </div>
        </div>

        <!-- Форма -->
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 mx-auto max-w-md"
          @submit="onSubmit"
        >
          <UFormField
            label="Почта"
            name="email"
          >
            <UInput
              v-model="state.email"
              required
              size="xl"
              placeholder="your.email@example.com"
            />
          </UFormField>

          <UFormField
            label="Имя"
            name="name"
          >
            <UInput
              v-model="state.name"
              type="name"
              size="xl"
              placeholder="Ваше имя"
            />
          </UFormField>

          <UFormField
            label="Телефон"
            name="phone"
          >
            <UInput
              v-model="state.phone"
              type="tel"
              size="xl"
              placeholder="8-999-999-99-99"
            />
          </UFormField>

          <UFormField
            label="Сообщение"
            name="message"
            :required="false"
          >
            <UTextarea
              v-model="state.message"
              type="text"
              placeholder="Напишите мне что-нибудь..."
              size="xl"
            />
          </UFormField>

          <UButton
            type="submit"
            size="lg"
          >
            Отправить
          </UButton>
        </UForm>
      </div>
    </UPageSection>

    <!-- <UPageSection
      v-if="page.blog"
      id="blog"
      :title="page.blog.title"
      :description="page.blog.description"
    />

    <UPageSection
      v-if="page.faq"
      id="faq"
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <UAccordion
        v-if="page.faq.categories?.length"
        :items="page.faq.categories.map(category => ({
          label: category.title,
          content: category.questions.map(q => ({
            label: q.label,
            content: q.content
          }))
        }))"
        multiple
      />
    </UPageSection> -->
  </div>
</template>

<script setup lang="ts">
// Загрузка данных из YAML
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

// SEO метаданные
useSeoMeta({
  title: page.value.seo.title,
  description: page.value.seo.description,
  ogTitle: page.value.seo.title,
  ogDescription: page.value.seo.description,
  twitterTitle: page.value.seo.title,
  twitterDescription: page.value.seo.description
})

// Настройка глобальных сообщений ошибок Zod
z.setErrorMap((issue, ctx) => {
  if (issue.code === 'too_small' && issue.type === 'string') {
    return { message: 'Поле обязательно для заполнения' }
  }
  if (issue.code === 'invalid_string' && issue.validation === 'email') {
    return { message: 'Неверный формат почты' }
  }
  return { message: ctx.defaultError }
})

const schema = z.object({
  name: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  email: z.string().email(),
  message: z.string(),
  phone: z.string().regex(/^\+7\d{10}$/, 'Неверный формат телефона').optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  name: undefined,
  phone: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>
