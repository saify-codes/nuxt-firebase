<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>

import firebaseService from '~/services/firebaseService';

const auth = useAuth();

onMounted(() => {
  auth.init();
  firebaseService.init()
});
</script>
