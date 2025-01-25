<template>
  <div class="min-h-screen grid grid-layout" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
    <!-- Navbar -->
    <nav class="bg-blue-500 text-white p-4 flex items-center gap-4">
      <TfsButton
        icon="mdi-menu"
        iconClasses="text-gray-600"
        @click="toggleSidebar"
        variant="ghost"
        class="text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Toggle sidebar"
      />
      
      <div class="text-xl font-bold">TFS - Practical Exercises in English</div>
    </nav>

    <!-- Sidebar -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="translate-x-[-100%]"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-[-100%]"
    >
      <aside 
        v-show="isSidebarOpen" 
        @click.stop
        class="bg-white fixed inset-0 z-50 overflow-y-auto"
        :class="[
          isSmaller?.md ? 'w-full md:w-64' : 'w-64 border-r'
        ]"
      >
        <!-- Sidebar Header -->
        <div class="flex justify-between items-center p-4 border-b bg-gray-50 sticky top-0">
          <h2 class="font-bold text-xl text-gray-800">Menu</h2>
          <TfsButton
            icon="mdi-close"
            iconClasses="text-gray-600"
            @click="closeSidebar"
            variant="ghost"
            class="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none"
            aria-label="Close menu"
          />
        </div>

        <!-- Sidebar Content -->
        <nav class="p-4 space-y-2">
          <div v-for="(difficulty, diffKey) in difficulties" :key="diffKey">
            <!-- Difficulty Level -->
            <div 
              class="font-medium text-gray-700 p-2 hover:bg-gray-200 rounded cursor-pointer"
              :class="{ 'opacity-50 cursor-not-allowed': !difficulty.isActive }"
              @click="handleNavigation(`/${diffKey}`, difficulty.isActive)"
            >
              {{ difficulty.label }}
            </div>

            <!-- Topics under each difficulty -->
            <div v-if="difficulty.topics" class="ml-4 space-y-1">
              <div v-for="(topic, topicKey) in difficulty.topics" :key="topicKey">
                <div 
                  class="text-gray-600 p-2 hover:bg-gray-200 rounded cursor-pointer"
                  :class="{ 'opacity-50 cursor-not-allowed': !topic.isActive }"
                  @click="handleNavigation(`/${diffKey}/${topicKey}`, topic.isActive)"
                >
                  {{ topic.label }}
                </div>

                <!-- Exercises under each topic -->
                <div v-if="topic.exercises" class="ml-4">
                  <div v-for="(exercise, exerciseKey) in topic.exercises" :key="exerciseKey">
                    <div 
                      class="text-sm text-gray-500 p-2 hover:bg-gray-200 rounded cursor-pointer"
                      :class="{ 'opacity-50 cursor-not-allowed': !exercise.isActive }"
                      @click="handleNavigation(`/${diffKey}/${topicKey}/${exerciseKey}`, exercise.isActive)"
                    >
                      {{ exercise.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </Transition>

    <!-- Backdrop for mobile -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isSmaller?.md && isSidebarOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- Main Content -->
    <main class="p-6 overflow-y-auto">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex flex-wrap items-center gap-2 text-gray-600">
          <li>
            <NuxtLink to="/" class="hover:text-blue-500">Home</NuxtLink>
          </li>
          <template v-for="(crumb, index) in breadcrumbs" :key="index">
            <li class="flex items-center gap-2">
              <span class="text-gray-400">/</span>
              <NuxtLink 
                :to="crumb.path" 
                class="hover:text-blue-500"
                :class="{ 'text-gray-900': index === breadcrumbs.length - 1 }"
              >
                {{ crumb.name }}
              </NuxtLink>
            </li>
          </template>
        </ol>
      </nav>

      <!-- Page Content -->
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 p-4 text-center text-gray-600">
      <p>&copy; 2024 Practical Exercises in English. All rights reserved.</p>
      <p class="mt-2">
        Desarrollado por 
        <a 
          href="https://the-full-stack.com/bypabloc?utm_source=practical-exercises-in-english&utm_medium=web&utm_campaign=footer" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800"
        >
          TheFullStack - Pablo Contreras
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/stores/exercises'
import { computed, ref } from 'vue'

const exerciseStore = useExerciseStore()
const route = useRoute()
const router = useRouter()

const { isSmaller } = useUi()

// Initialize sidebar state based on screen size
const isSidebarOpen = ref(false)

const difficulties = computed(() => exerciseStore.difficulties)

// Navigation helper
const navigateToPage = (path) => {
  if (path !== route.path) {  // Solo cerramos si la ruta es diferente
    router.push(path)
    if (isSmaller.value?.md) {
      closeSidebar()
    }
  }
}

// Sidebar controls
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleNavigation = (path, isActive) => {
  if (isActive) {
    navigateToPage(path)
    isSidebarOpen.value = false
  }
}

watch(() => isSmaller.value?.md, (isMobile) => {
  isSidebarOpen.value = !isMobile
})

// Breadcrumb computation
const breadcrumbs = computed(() => {
  const { difficulty, topic, exercise } = route.params
  const crumbs = []

  if (difficulty) {
    crumbs.push({
      name: difficulties.value[difficulty]?.label || difficulty,
      path: `/${difficulty}`
    })
  }

  if (topic) {
    crumbs.push({
      name: difficulties.value[difficulty]?.topics[topic]?.label || topic,
      path: `/${difficulty}/${topic}`
    })
  }

  if (exercise) {
    crumbs.push({
      name: difficulties.value[difficulty]?.topics[topic]?.exercises[exercise]?.label || exercise,
      path: `/${difficulty}/${topic}/${exercise}`
    })
  }

  return crumbs
})
</script>

<style>
.grid-layout {
  display: grid;
  grid-template-areas:
    "nav"
    "main"
    "footer";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  height: 100%;
}

@media (min-width: 768px) {
  .grid-layout {
    grid-template-areas:
      "nav nav"
      "sidebar main"
      "footer footer";
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto 1fr auto;
  }

  .grid-layout.sidebar-collapsed {
    grid-template-columns: 0 1fr;
  }
}

nav {
  grid-area: nav;
  position: sticky;
  top: 0;
  z-index: 40;
}

aside {
  grid-area: sidebar;
  position: fixed;
  height: calc(100vh - var(--nav-height));
  top: var(--nav-height);
}

@media (min-width: 768px) {
  aside {
    width: 300px;
    position: sticky;
  }
}

main {
  grid-area: main;
  position: relative;
  z-index: 1;
  min-height: 0; /* Importante: permite que el contenido se ajuste */
  height: 100%; /* Toma el espacio disponible en el grid */
}

footer {
  grid-area: footer;
  position: relative;
  z-index: 1;
}
</style>
