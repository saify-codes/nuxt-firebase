<template>

    <form @submit.prevent="onSubmit"
        class="absolute inset-0 m-auto p-10 rounded-lg max-w-lg h-max shadow-md flex flex-col gap-5 item justify-center">

        <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <InputText id="email" v-model="email.value" :ref="email.ref" />
            <small class="text-red-600" v-if="email.error">{{ email.error.message }}</small>
        </div>

        <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <InputText id="password" v-model="password.value" :ref="password.ref" type="password" />
            <small class="text-red-600" v-if="password.error">{{ password.error.message }}</small>
        </div>

        <div class="flex items-center gap-2">
            <Checkbox id="remember" v-model="checked" :binary="true" />
            <label for="remember">Remember me</label>
        </div>

        <Button type="submit">submit</Button>

        <p>don't have an account? 
            <router-link class="text-primary underline" to="/signup">signup here</router-link> 
        </p>

    </form>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Checkbox from 'primevue/checkbox';
import { useForm } from "vue-hooks-form";

const { useField, handleSubmit } = useForm({
    defaultValues: {},
});

const email = useField("email", {
    rule: { required: true },
});

const password = useField("password", {
    rule: {
        required: true,
        min: 6,
        max: 10,
    },
});

const checked = ref(false)

const onSubmit = handleSubmit((data) => {
  console.log(data)
})


</script>
