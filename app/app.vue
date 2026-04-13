<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Nuxt Starter Template'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
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
      <div v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
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
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>

        <TemplateMenu />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
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

    <USeparator/>

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
