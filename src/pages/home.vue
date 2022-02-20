<template>
  <div v-if="isLoading">
    loading
  </div>
  <div v-else>
    content
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const isLoading = ref(true)

  // setTimeout(() => {
  //   isLoading.value = false
  // }, 1000)

    return { isLoading }
  }
}
</script>
