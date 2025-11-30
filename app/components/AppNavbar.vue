<template>
  <nav class="bg-white dark:bg-neutral-800 shadow-md border-b-2 border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="px-6 sm:px-6 md:px-6 lg:px-6 xl:px-6">
      <div class="flex justify-between items-center h-16 relative">
        <!-- Left side - Mobile menu button (visible on mobile only) / Logo (desktop) -->
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <button @click="drawer?.toggle"
            class="md:hidden w-10 h-10 flex items-center justify-center rounded-md text-neutral-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Icon name="lucide:menu" class="w-6 h-6" />
          </button>

          <!-- Desktop Logo/Title -->
          <NuxtLink to="/" class="hidden md:flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="lucide:building-2" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-semibold text-neutral-900 dark:text-white">
              影片库
            </span>
          </NuxtLink>
        </div>

        <!-- Center - Mobile Logo and Title (centered) -->
        <div class="absolute left-1/2 transform -translate-x-1/2 md:hidden flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div
              class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="lucide:building-2" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-semibold text-neutral-900 dark:text-white">
              影片库
            </span>
          </NuxtLink>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Color Mode Toggle -->
          <ColorModeToggle />

          <!-- Auth actions -->
          <div v-if="loggedIn && user">
            <UDropdownMenu :items="[
              [{
                label: '个人资料',
                icon: 'i-lucide-user',
                to: '/profile'
              }],
              [{
                label: '设置',
                icon: 'i-lucide-cog',
                to: '/settings'
              }],
              [{
                label: '登出',
                icon: 'i-lucide-sign-out',
                onSelect: handleLogout
              }]
            ]" :popper="{ placement: 'bottom-end' }">
              <UButton color="neutral" variant="ghost" class="flex items-center px-0">
                <UAvatar
                  v-if="user.avatarUrl"
                  :src="user.avatarUrl"
                  :text="(user.fullName || user.nickname || user.email)?.charAt(0)?.toUpperCase()"
                  size="sm"
    
                />
                <span class="text-sm font-medium text-neutral-700 dark:text-gray-300 hidden md:block">
                  {{ user.fullName || user.nickname || user.email }}
                </span>
                <Icon name="i-lucide-chevron-down" class="w-4 h-4 text-neutral-400" />
              </UButton>
            </UDropdownMenu>
          </div>
          <div v-else>
            <UButton to="/login" color="primary" variant="solid">
              登录
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// const {
//   status,
//   data,
//   lastRefreshedAt,
//   token,
//   refreshToken,
//   getSession,
//   signUp,
//   signIn,
//   signOut,
//   refresh
// } = useAuth()
// const loggedIn = computed(() => status.value === 'authenticated')
// const user = computed(() => data.value?.data?.user || null)

// // 使用注入的抽屉状态
// const drawer = inject('drawer', null)

// const handleLogout = async () => {
//   try {
//     await signOut({ callbackUrl: '/login' })
//   } catch (error) {
//     console.error('Logout error:', error)
//     navigateTo('/login')
//   }
// }
</script>