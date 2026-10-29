<script setup>
const baseURL = useRuntimeConfig().app.baseURL

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: `${baseURL}favicon.ico` }
  ],
  htmlAttrs: {
    lang: 'ru'
  }
})

const siteUrl = 'https://programistro.github.io'
const ogImage = `${siteUrl}${baseURL.replace(/\/$/, '')}/og-image.png`
const title = 'Roman Grigoriev — Fullstack Developer'
const description = 'Портфолио Романа Григорьева: веб-приложения и API для интернет-магазинов, CRM-систем и админок, а также кросс-платформенные мобильные приложения.'

useSeoMeta({
  title,
  description,
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogImageAlt: 'Roman Grigoriev — Fullstack Developer',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage
})

const loading = ref(true)
const displayedText = ref('')
const fullText = 'Hello World!'
const typingSpeed = 100 // мс на символ

// Анимация печатания текста
onMounted(async () => {
  for (let i = 0; i <= fullText.length; i++) {
    displayedText.value = fullText.slice(0, i)
    await new Promise(resolve => setTimeout(resolve, typingSpeed))
  }

  // Ждём после завершения печати
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
})
</script>

<template>
  <div>
    <!-- Лоадер при загрузке -->
    <Transition name="fade">
      <div
        v-if="loading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
      >
        <div class="flex flex-col items-center gap-6">
          <!-- Печатающийся текст -->
          <div class="text-3xl font-bold text-primary-500">
            {{ displayedText }}<span class="animate-pulse">|</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>

  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <!-- <AppLogo class="w-auto h-6 shrink-0" /> -->
          <UHeaderTitle class="text-lg font-semibold">
            Roman Grigoriev
          </UHeaderTitle>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/programistro"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Roman Grigoriev • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/programistro"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
