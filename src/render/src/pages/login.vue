<template>
    <div class="flex items-center page-something justify-center py-10">
        <div class="max-w-md w-full space-y-8">
            <Form @submit="loginUser">
                <label class="text-xs ml-1">Password</label>
                <Field
                    v-model="pass"
                    name="pass"
                    type="password"
                    class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Your super secret password once again"
                    :rules="validatePass"
                />
                <ErrorMessage name="pass" class="text-xs text-red-500 ml-1" />
                <div class="flex justify-center mt-5">
                    <button type="submit" class="px-3 py-1 rounded bg-indigo-300 font-semibold">
                        Login
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'

import loadStates from '../plugins/state'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const pass = ref('')
        const appState = loadStates()
        return { ...appState, pass }
    },
    methods: {
        loginUser() {
            this.loggedIn = true
            this.$router.push('/home/2fa')
        },
        validatePass(value:string) {
            if (!value) return 'Please enter the password!'
            else if (value !== this.password) return 'Invalid password!'
            return true
        }
    }
})
</script>

