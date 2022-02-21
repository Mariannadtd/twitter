<template>
  <div v-if="isLoading">
    <Spinner/>
  </div>
  <div v-else>
    content
  </div>
</template>

<script>
import { ref } from 'vue'
import Spinner from '@/components/UI/Spinner.vue'

export default {
  components: { Spinner },
  setup() {
    const isLoading = ref(true)

  setTimeout(() => {
    isLoading.value = false
  }, 3000)

    return { isLoading }
  }
}
</script>
