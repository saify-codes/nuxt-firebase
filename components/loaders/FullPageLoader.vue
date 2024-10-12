<style scoped>
    .loader{
        position: fixed;
        inset: 0;
        margin: auto;
        background: #FFF;
        display: grid;
        place-content: center;
    }
</style>

<template>
    <div class="loader">
        <Vue3Lottie :animationData="animation" :height="320" :width="320" />
    </div>
</template>


<script setup>
import { Vue3Lottie } from "vue3-lottie";
import animation from "@/lottie/cat.json";
</script>
