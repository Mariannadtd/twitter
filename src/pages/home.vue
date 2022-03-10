<template>
  <div v-if="isLoading">
    <Spinner/>
  </div>
  <div v-else>
    <div class="tweet-menu-wrapper">
      <div class="tweet-menu">
        <select v-model="sortBy" name="sortBy">
          <option value="date">Sort by date</option>
          <option value="likes">Sort by likes</option>
        </select>
      </div>
    </div>
    <div class="tweets__wrapper" v-for="item in dataSortered" :key="item.id">
      <Tweet
        :id="item.id"
        :likes="item.likes"
        :name="item.date"
        :imgUrl="item.avatar"
        @onSubmit="handleLikeSubmit"
      >
        {{ item.body }}
      </Tweet>
    </div>

    <button
      @click="handleModalShow"
      class="btn btnTweet btnTweetHome"
    >
      New tweet
    </button>
    <Modal title="New Tweet" v-if="showModal" @onClose="handleModalShow">
      <form @submit.prevent="handleStore">
        <textarea name="body" id="body" v-model="tweet.body"></textarea>
        <button type="submit" class="btn btnTweet">Submit</button>
      </form>
    </Modal>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import http from '@/http-common'

import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'
import Tweet from '@/components/UI/Tweet.vue'
// import TweetForm from '@/components/UI/TweetForm.vue'


export default {
  components: { Spinner, Modal, Tweet },
  setup() {
    const data = ref([
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
    ])

    // отправка твита
    const handleTweetSubmit = body => {
      data.value.push({
        id: data.value.length + 1,
        body,
        avatar:
          'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 0,
        date: new Date(Date.now()).toLocaleString()
      })
      handleModalShow()
    }

    // эмит лайка
    const handleLikeSubmit = id => console.log(`tweet id ${id} has been liked`)
    const sortBy = ref('date')
    const dataSortered = computed(() => {
      return [...data.value].sort((a, b) => {
        if (a[sortBy.value] < b[sortBy.value]) return 1
        if (a[sortBy.value] > b[sortBy.value]) return -1
      })
    })


    const isLoading = ref(false)
    // setTimeout(() => {
    //   isLoading.value = false
    // }, 1500)

    const tweet = reactive ({
      avatar: 'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
      likes: 0,
      date: new Date(Date.now()).toLocaleString(),
      body: ''
    })

    const handleStore = () => {
      http.post ('/tweets.json', tweet)
      console.log(tweet)

      // reset
      tweet.body = ''
    }

    const showModal = ref(false)
    const handleModalShow = () => {
      const nextShowModal = showModal.value = !showModal.value
      showModal.value = nextShowModal
    }

    return {
      data,
      handleLikeSubmit,
      handleTweetSubmit,
      sortBy,
      dataSortered,
      isLoading,
      showModal,
      handleModalShow,
      handleStore,
      tweet
      }
  }
}
</script>
