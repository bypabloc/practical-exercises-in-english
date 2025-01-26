<template>
  <NuxtLayout>
    <Analytics
      v-if="ENV === 'prod'"
    />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'

const nuxtApp = useNuxtApp()

const { $config, $logger } = nuxtApp

const { ENV } = $config?.public || {}
</script>

<style>
body {
  margin: 0px;
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #f5f5f5;
}
</style>
