<template>
    <div>
        <h1>This is home page</h1>
        <Button @click="logout" >logout</Button>
    </div>
</template>

<script setup>

function logout(){
    const auth = useAuth()
    auth.destroySession()
    navigateTo('/signin')
}

</script>