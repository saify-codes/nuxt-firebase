<template>
  <div>
    <FullPageLoader v-if="session.status === 'loading'" />
    <slot />
  </div>
</template>


<script setup>
import FullPageLoader from "~/components/loaders/FullPageLoader.vue";
const { session } = useAuth();
</script>