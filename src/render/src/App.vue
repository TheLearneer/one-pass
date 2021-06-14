<template>
  <div class="px-2 mx-auto">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

import loadStates from './plugins/state'

export default defineComponent({
  setup() {
    const state = loadStates()
    return { ...state }
  },
  async mounted() {
    const pass = await window.OnePass.password.get();
    if (pass) {
      this.registered = true
      this.password = pass
      this.$router.push('/login')
    }
  }
})
</script>

<style>
.page-enter-from {
  opacity: 0;
}
.page-enter-active {
  transform: translateY(-1rem);
  transition: 0.4s ease;
}
.page-enter-to {
  transform: translateY(0);
}
.page-leave-active {
  transition: 0.4s ease;
}
.page-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}
.page-something {
  min-height: 95vh;
}
</style>