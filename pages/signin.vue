<template>
    <router-link to="/signup">goto register page</router-link>

    <h5>{{ count }}</h5>
</template>

<script setup>
const count = useState('foo', ()=> 0)
</script>