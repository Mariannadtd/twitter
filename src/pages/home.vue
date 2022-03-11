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
import { onMounted, ref, reactive, computed } from 'vue'
import http from '@/http-common'

import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'
import Tweet from '@/components/UI/Tweet.vue'
// import TweetForm from '@/components/UI/TweetForm.vue'


export default {
  components: { Spinner, Modal, Tweet },
  setup() {
    const isLoading = ref(true)
    // setTimeout(() => {
    //   isLoading.value = false
    // }, 1500)
    const data = ref([])

    onMounted(() =>  getTweets())

    const getTweets = () =>
      http
        .get('/tweets.json')
        .then(res => {
          const nextData = []
          Object.keys(res.data).forEach(key => {
            const item = res.data[key]
            nextData.push({ id: key, ...item})
          })

          data.value = nextData
          isLoading.value = false

        })
        .catch(e => console.log(e))

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

    const tweet = reactive ({
      avatar: `https://avatars.dicebear.com/api/male/${Date.now()}.svg?background=pink`,
      likes: 0,
      date: new Date(Date.now()).toLocaleString(),
      body: ''
    })

    const handleStore = () => {
      http
        .post ('/tweets.json', tweet)
        .then(() => {
           // reset
          tweet.body = ''
          handleModalShow()
          getTweets()
        })
        .catch(e => console.log(e))
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
