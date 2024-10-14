<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup>

import firebaseService from '~/services/firebaseService';

const auth = useAuth();

onMounted(() => {
  firebaseService.init() // always initialized firebase before any other service
  auth.init();
});

</script>
