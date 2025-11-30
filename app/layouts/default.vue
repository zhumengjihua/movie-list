<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Top Navigation Bar (Full Width) -->
    <AppNavbar />

    <!-- Below Navigation -->
    <div class="flex min-h-0" style="height: calc(100vh - 66px);">
      <!-- Mobile Drawer Overlay -->
      <div v-if="drawerOpen" class="fixed inset-0 z-40 md:hidden" style="background-color: rgba(0, 0, 0, 0.5);"
        @click="closeDrawer"></div>

      <!-- <CollapsibleSidebar :is-mobile-drawer="drawerOpen" /> -->

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <!-- Main Content -->
        <main class="flex-1 overflow-auto overflow-x-hidden">
          <slot />
        </main>

        <!-- Footer -->
        <footer
          class="bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200 flex-shrink-0">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center text-neutral-600 dark:text-gray-400 text-sm">
              <p>&copy; {{ currentYear }} 影片库. 基于 Nuxt 4 和 @sidebase/nuxt-auth.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>

  <!-- 通知容器 -->
  <UNotifications />
</template>

<script setup>
// import CollapsibleSidebar from '~/components/common/CollapsibleSidebar.vue';

const currentYear = new Date().getFullYear()

// 抽屉状态控制 - 使用provide/inject模式
const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const closeDrawer = () => {
  drawerOpen.value = false
}

// 提供给子组件使用
provide('drawer', {
  isOpen: readonly(drawerOpen),
  toggle: toggleDrawer,
  close: closeDrawer
})
</script>