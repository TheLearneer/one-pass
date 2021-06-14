<template>
    <div v-if="selected" class="page-something py-5 select-none" align="center">
        <img :src="getBrandLogo(selectedSecret.icon)" class="w-24 h-24 object-contain mb-5">
        <p class="text-3xl font-semibold text-center"> {{ selectedSecret.name }} </p>
        <p class="mt-2 italic text-center"> {{ selectedSecret.description || '-' }} </p>
        <div class="my-7">
            <span> New token in:</span>
            <div class="relative w-20 h-20 bg-gray-50 rounded-full">
                <Progress :radius="40" :progress="(timeRemaining / 30) * 100" class="absolute text-indigo-600" />
                <p class="py-6 font-bold text-2xl"> {{ timeRemaining }} </p>                    
            </div>
        </div>
        <p class="text-4xl font-semibold tracking-wider"> {{ getToken(selectedSecret.secret) }} </p>

        <div class="flex justify-center gap-x-5 mt-10">
            <button
                @click="copyToken"
                class="px-3 py-1 mt-5 block rounded border border-indigo-300 bg-indigo-200 hover:bg-indigo-300 font-semibold focus:outline-none"
                :disabled="!canWrite"
            >
                Copy
            </button>
            <button
                @click="reset"
                class="px-3 py-1 mt-5 block rounded border border-red-300 bg-red-200 hover:bg-red-300 font-semibold focus:outline-none"
            >
                Back
            </button>
        </div>
    </div>
    <div v-else>
        <div class="flex gap-x-2">
            <!-- <div class="my-auto">
                TOGGLE
            </div> -->
            <input
                v-model="search"
                type="text"
                placeholder="Search for 2FA token"
                class="relative flex-grow block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none"
            />
            <AddIcon class="w-8 h-8 my-auto cursor-pointer" @click="$router.push({ path: '/home/2fa/new' })" />
        </div>
        <!-- {{ search  }} -->
        <div class="w-full mt-5 bg-gray-100 border border-gray-300 rounded h-[29rem] max-h-[29rem] overflow-y-auto">
            <div v-if="!secrets.length" class="items-center text-center font-semibold text-xl italic">
                No 2FA tokens saved!
            </div>
            <div
                v-for="(entry, i) of secrets"
                :key="i"
                class="px-3 py-4 flex flex-wrap cursor-pointer"
                :class="{ 'bg-gray-200': i % 2 === 1}"
                @click="gotoSecret(entry.id)"
            >
                <img :src="getBrandLogo(entry.icon)" class="w-14 h-14 object-contain">
                <div class="my-auto ml-5">
                    <p class="font-semibold text-lg"> {{ entry.name }} </p>
                    <span class="text-sm italic"> {{ entry.description || '-' }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useIntervalFn, useClipboard, usePermission } from '@vueuse/core'

import brands from '../../assets/brands.json'
import AddIcon from '../../components/icons/add.vue'
import Progress from '../../components/ProgressCircle.vue'

export default defineComponent({
    components: {
        AddIcon,
        Progress
    },
    setup() {
        const search = ref('')
        const token = ref('')
        const secrets = ref([] as any[])

        const selected = ref(false)
        const selectedId = ref('')

        const selectedSecret = computed(() => {
            if (!selectedId) return 'INVALID BOI'
            else return secrets.value.find(scr => scr.id === selectedId.value)
        })

        // Getting all secrets on mount
        onMounted(async () => {
            secrets.value = await window.OnePass.secrets.getAll()
        })
        
        // Handling timed token and time remaining
        let timeRemaining = ref(30)
        useIntervalFn(() => {
            timeRemaining.value = window.otplib.authenticator.timeRemaining()
        }, 1000)

        const canWrite = usePermission("clipboard-write")

        return { secrets, search, selected, selectedId, selectedSecret, timeRemaining, token, canWrite }
    },
    methods: {
        getBrandLogo(id: string) {
            const brand = brands.find(br => br.id === id)
            return brand ? `/logos/${brand.icon}` : 'logos/default.svg'
        },
        gotoSecret(id: string) {
            this.selected = true
            this.selectedId = id
        },
        reset() {
            this.selected = false
            this.selectedId = ''
            this.token = ''
        },
        getToken(secret: string) {
            const token = window.otplib.authenticator.generate(secret)
            this.token = token
            return token
        },
        copyToken() {
            const { copy } = useClipboard()
            copy(this.token)
        }
    }
})
</script>

<style scoped>
.progress-ring {
  transition: 0.35s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>