<template>
    <div>
        <h1>Welcome {{ Auth.user?.name }}</h1>
        <Button @click="logout" >logout</Button>
    </div>
</template>

<script setup>

function logout(){
    const auth = useAuth()
    auth.logout()
    useSessionMessage().flash('auth', 'you have been logout')
}

</script>