<template>
    <div>
      <FullPageLoader v-if="show && session.status === 'loading'" />
      <slot />
    </div>
  </template>
  
  
  <script setup>
  import FullPageLoader from "~/components/loaders/FullPageLoader.vue";
  const { session } = useAuth();
  const show = ref(false)
  
  // prevent flickering effect
  setTimeout(() => {
    show.value = true
  }, 300);
  
  
  </script>