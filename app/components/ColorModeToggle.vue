<template>
  <button
    @click="toggleColorMode"
    class="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    :title="`切换到 ${nextMode} 模式`"
  >
    <Icon
      :name="modeIcon"
      class="w-5 h-5 text-neutral-700 dark:text-gray-300"
    />
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const modes = ['system', 'light', 'dark']
const modeIcons = {
  system: 'lucide:monitor',
  light: 'lucide:sun',
  dark: 'lucide:moon'
}

const currentModeIndex = computed(() => modes.indexOf(colorMode.preference))
const nextMode = computed(() => modes[(currentModeIndex.value + 1) % modes.length])
const modeIcon = computed(() => modeIcons[colorMode.preference])

const toggleColorMode = () => {
  colorMode.preference = nextMode.value
}
</script>