<template>
    <teleport to="body">
        <div
            class="absolute bottom-5 right-5"
            :class="{
                'bg-red-400': type === 'danger',
                'bg-blue-400': type === 'success',
                'bg-yellow-400': type === 'warning'
            }">
            <slot />
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        type: {
            validator(value: string) {
                return ['success', 'warning', 'danger'].includes(value);
            }
        }
    }
})
</script>
