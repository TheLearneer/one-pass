<template>
    <div v-if="!phase2" class="text-center mt-3">
        <p>You can add Authenticator accounts such as Gmail, Facebook, Dropxbox and many more</p>
        <p class="italic text-sm">Scanning QR codes is not yet supported!</p>
    </div>
    <div class="flex justify-center" :class="phase2 ? 'mt-5' : 'mt-10'">
        <div class="max-w-2xl w-full space-y-8">
            <Form @submit="addToken">
                <!-- 1st phase: Data entry -->
                <div v-if="!phase2" class="flex-grow px-2">
                    <div>
                        <label class="text-xs ml-1">Enter code given by website <b>*</b></label>
                        <Field
                            v-model="secret"
                            name="secret-text"
                            type="text"
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none sm:text-sm"
                            placeholder="E.g. un2s yrls axut 1xv6"
                            :rules="validateSecret"
                        />
                        <ErrorMessage name="secret-text" class="text-xs text-red-500 ml-1" />
                    </div>
                    <div class="relative mt-2">
                        <label class="text-xs ml-1">Account Name (Issuer)<b>*</b></label>
                        <Field
                            v-model="name"
                            name="account-name"
                            type="text"
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none sm:text-sm"
                            placeholder="E.g. Gmail App"
                            :rules="validateName"
                        />
                        <p class="text-right text-xs">
                            <span :class="{ 'text-red-600': name.length > 15 }"> {{ name.length }} </span>
                            <span>/20</span>
                        </p>
                        <ErrorMessage name="account-name" class="text-xs text-red-500 ml-1 absolute bottom-0" />
                    </div>
                    <div class="mt-2">
                        <label class="text-xs ml-1">Short Description (Label)</label>
                        <input
                            maxlength="75"
                            v-model="description"
                            name="account-description"
                            class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none sm:text-sm"
                            placeholder="E.g. contact@santoshb.com.np"
                        />
                        <p class="text-right text-xs">
                            <span :class="{ 'text-yellow-700': description.length > 60 }"> {{ description.length }} </span>
                            <span>/75</span>
                        </p>
                    </div>
                </div>
                <!-- 2nd phase: Icon selection -->
                <div v-else>
                    <div class="p-3 mb-4 bg-gray-300 flex rounded">
                        <img :src="`/logos/${getLogo()}`" class="w-12 h-12 my-auto object-contain">
                        <div class="my-auto ml-3">
                            <p class="font-semibold text-lg"> {{ name }} </p>
                            <span v-if="description" class="text-sm"> {{ description }} </span>
                        </div>
                    </div>
                    <input
                        v-model="brandSearch"
                        class="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none sm:text-sm"
                        placeholder="Search brand icon"
                    >
                    <div class="bg-gray-100 border border-gray-300 rounded max-h-80 h-80 mt-4 px-3 py-2 flex flex-wrap gap-x-[0.58rem] gap-y-[0.58rem] overflow-y-auto content-start">
                        <div
                            v-for="(brand, i) of brandList"
                            :key="i"
                            class="w-28 h-24 py-2 rounded cursor-pointer"
                            :class="icon === brand.id ? 'bg-indigo-200' : 'border border-indigo-200 hover:bg-indigo-100'"
                            align="center"
                            @click="changeLogo(brand.id)"
                        >
                            <img :src="`/logos/${brand.icon}`" class="w-12 h-12 object-contain">
                            <p class="mt-2 font-semibold text-sm"> {{ brand.name }} </p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-5 gap-x-5">
                    <button type="submit" class="px-3 py-1 rounded border border-indigo-300 bg-indigo-200 hover:bg-indigo-300 font-semibold focus:outline-none">
                        <span v-if="phase2"> Add Account </span>
                        <span v-else> Continue </span>
                    </button>
                    <button v-if="phase2" class="px-3 py-1 rounded border border-yellow-300 bg-yellow-200 hover:bg-yellow-300 font-semibold focus:outline-none" @click="phase2 = !phase2">
                        Back
                    </button>
                    <button @click="exit" class="px-3 py-1 rounded border border-red-300 bg-red-200 hover:bg-red-300 font-semibold focus:outline-none">
                        Cancel
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'

import brands from '../../assets/brands.json'

export default defineComponent({
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup () {
        const secret = ref("")
        const name = ref("")
        const description = ref("")
        const icon = ref("default")

        const brandSearch = ref("")
        const phase2 = ref(false)
        const customIcon = ref(false)

        const brandList = computed(() => {
            const regex = new RegExp(`${brandSearch.value.toLowerCase()}`, 'gi')
            const items = brandSearch.value ? brands.filter(br => regex.test(br.name)) : brands
            return [
                ...items.filter(it => it.id.includes('default')),
                ...items.filter(it => !it.id.includes('default')).sort((a, b) => a.name > b.name ? 1 : -1)
            ]
        })

        return { secret, name, description, brandSearch, brandList, phase2, icon, customIcon }
    },
    methods: {
        addToken() {
            if (this.phase2) {
                window.OnePass.secrets.set({
                    secret: this.secret,
                    name: this.name,
                    description: this.description,
                    icon: this.icon,
                    id: (new Date().getTime()).toString(36)
                })
                this.reset()
                this.$router.push({ path: '/home/2fa' })
            } else {
                const brand = brands.filter(br => br.id === this.name.toLowerCase())
                if (brand.length === 1) {
                    if (!this.customIcon) this.icon = brand[0].id
                } else {
                    this.icon = 'default'
                }
                this.phase2 = true
            }
        },
        exit() {
            this.$router.push({ path: '/home/2fa' })
        },
        validateSecret(value: string) {
            if (!value) return 'You must provide the secret!'
            return true
        },
        validateName(value: string) {
            if (!value) return 'You must provide a name for this 2FA secret!'
            if (value.length > 20) return 'Account name must be 20 characters or less!'
            return true
        },
        getLogo(id?: string) {
            if (!id) id = this.icon
            return brands.find(br => br.id === id)?.icon
        },
        changeLogo(id: string) {
            this.icon = id
            this.customIcon = true
        },
        reset() {
            this.name = ''
            this.description = ''
            this.secret = ''
            this.icon = ''
            this.brandSearch = ''
            this.phase2 = false
            this.customIcon = false
        }
    }
})
</script>
