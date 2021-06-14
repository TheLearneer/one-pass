<template>
    <div class="flex items-center page-something justify-center py-10">
        <div class="w-full text-center" v-if="successfullyRegistered">
            <p class="text-lg font-semibold"> Thank you for registering! </p>
            <p class="mt-5">
                You will now be redirected to login page
            </p>
        </div>
        
        <div v-else class="max-w-md w-full space-y-8">
            <p class="text-3xl font-semibold text-center"> OnePass </p>
            <div class="text-center my-8 italic text-sm">
                It seems this is your first time using this software. To continue using this software please enter the password which you will require afterwards every time!
            </div>
            <Form @submit="registerNewUser">
                <div class="rounded-md">
                    <div>
                        <label class="text-xs ml-1">Password</label>
                        <Field
                            v-model="entryPassword"
                            name="entryPassword"
                            type="password"
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Your super secret password"
                            :rules="validatePassword"
                        />
                        <ErrorMessage name="entryPassword" class="text-xs text-red-500 ml-1" />
                    </div>
                    <div class="mt-3">
                        <label class="text-xs ml-1">Confirm Password</label>
                        <Field
                            v-model="entryPassword2"
                            name="entryPassword2"
                            type="password"
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Your super secret password once again"
                            :rules="validatePasswordRetry"
                        />
                        <ErrorMessage name="entryPassword2" class="text-xs text-red-500 ml-1" />
                    </div>
                </div>
                <div class="flex justify-center mt-10">
                    <button type="submit" class="px-3 py-1 rounded bg-indigo-300 font-semibold">
                        Register
                    </button>
                </div>
                <p class="mt-10 text-xs italic text-center">Password must be at least <span class="font-semibold">8 letters</span> and have at least one of each: uppercase, lowercase, number and special character!</p>
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
        const appState = loadStates()

        const entryPassword = ref('')
        const entryPassword2 = ref('')
        const successfullyRegistered = ref(false)

        return { ...appState, entryPassword, entryPassword2, successfullyRegistered }
    },
    methods: {
        async registerNewUser() {
            await window.OnePass.password.set(this.entryPassword)
            this.successfullyRegistered = true
            this.redirectToLogin()
        },
        validatePassword(value: string) {
            if (!value) return 'You must enter the passowrd!'
            if (!/(?=.{8,})/g.test(value)) return 'Password must be atleast 8 characters long!'
            if (!/(?=.*[A-Z])/g.test(value)) return 'Password must contain atelast 1 uppercase character!'
            if (!/(?=.*[a-z])/g.test(value)) return 'Password must contain atelast 1 lowercase character!'
            if (!/(?=.*[0-9])/g.test(value)) return 'Password must contain atelast 1 numeric character!'
            if (!/(?=.*[!@#$%^&*])/g.test(value)) return 'Password must contain atelast 1 special character!'
            return true
        },
        validatePasswordRetry(value: string) {
            if (!value) return 'You must re-enter the passowrd!'
            if (value !== this.entryPassword) return 'Password does not match!'
            return true
        },
        redirectToLogin() {
            setTimeout(() => {
                this.registered = true
                this.password = this.entryPassword
                this.$router.push('/login')
            }, 5000)
        }
    }
})
</script>
