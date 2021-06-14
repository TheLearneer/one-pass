<template>
    <svg
        :height="radius * 2"
        :width="radius * 2"
        class="stroke-current"
    >
        <circle
            fill="transparent"
            :stroke-dasharray="circumference + ' ' + circumference"
            :style="{ strokeDashoffset }"
            :stroke-width="stroke"
            :r="normalizedRadius"
            :cx="radius"
            :cy="radius"
        />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    props: {
        radius: {
            type: Number,
            required: true
        },
        progress: {
            type: Number,
            required: true
        },
        stroke: {
            type: Number,
            default: 4
        }
    },
    setup(props) {
        const normalizedRadius = props.radius - props.stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;

        const strokeDashoffset = computed(() => circumference - props.progress / 100 * circumference)

        return { normalizedRadius, circumference, strokeDashoffset }
    },
})
</script>

<style scoped>
circle {
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
</style>
