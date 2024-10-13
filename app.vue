<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>
const auth = useAuth();

onMounted(() => {
  auth.initializeSession();
});
</script>
