<template>
  <div v-if="isLoading">
    <Spinner/>
  </div>
  <div v-else>

    <div class="tweets__wrapper" v-for="item in data" :key="item.id">
      <Tweet
        :id="item.id"
        :likes="item.likes"
        :name="item.date"
        :imgUrl="item.avatar"
      >
        {{ item.body }}
      </Tweet>
    </div>

    <button @click="handleModalShow" class="btn btnPrimary">Open modal</button>
    <Modal v-if="showModal" @onClose="handleModalShow">
      modal window
    </Modal>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'
import Tweet from '@/components/UI/Tweet.vue'


export default {
  components: { Spinner, Modal, Tweet },
  setup() {
    const data = [
      {
        id: 1,
        body: 'Hi? friends',
        avatar: 'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 10,
        date: '01-11-2021',
      },
      {
        id: 2,
        body: 'Hi? friends',
        avatar: 'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 18,
        date: '22-09-2021',
      },
      {
        id: 3,
        body: 'Hi? friends',
        avatar: 'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 15,
        date: '10-05-2021',
      },
    ]

    const sortBy = ref('date')
    const dataSortered = computed(() => {
      return [...data].sort((a, b) => {
        if (a[sortBy.value] < b[sortBy.value]) return 1
        if (a[sortBy.value] > b[sortBy.value]) return -1
      })
    })


    const isLoading = ref(false)
    // setTimeout(() => {
    //   isLoading.value = false
    // }, 3000)

    const showModal = ref(false)
    const handleModalShow = () => {
      const nextShowModal = showModal.value = !showModal.value
      showModal.value = nextShowModal
    }

    return { data, dataSortered, isLoading, showModal, handleModalShow }
  }
}
</script>
