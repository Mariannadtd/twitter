<template>
  <div v-if="isLoading">
    <Spinner/>
  </div>
  <div v-else>
    content
    <button @click="handleModalShow" class="btn btnPrimary">Open modal</button>
    <Modal v-if="showModal" @onClose="handleModalShow">
      modal window
    </Modal>
  </div>
</template>

<script>
import { ref } from 'vue'

import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'


export default {
  components: { Spinner, Modal },
  setup() {
    const isLoading = ref(false)
    // setTimeout(() => {
    //   isLoading.value = false
    // }, 3000)

    const showModal = ref(false)
    const handleModalShow = () => {
      const nextShowModal = showModal.value = !showModal.value
      showModal.value = nextShowModal
    }

    return { isLoading, showModal, handleModalShow }
  }
}
</script>
