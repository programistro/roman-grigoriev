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
        }">
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
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
    />

    <UPageSection
      v-if="page.experience"
      id="experience"
      :title="page.experience.title"
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
      title="Testimonials"
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
        >
          <UUser
            :name="item.author.name"
            :description="item.author.description"
          />
        </UPageCTA>
      </UCarousel>
    </UPageSection>

    <UPageSection
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
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
// Загрузка данных из YAML
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
  description: page.value.seo.description
})
</script>
