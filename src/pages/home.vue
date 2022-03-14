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
        @onClick="handleUpdate(item)"
      >
        <div class="md-body" v-html="compiledMarked(item.body)"></div>
      </Tweet>
    </div>

    <button @click="handleModalShow" class="btn btnTweet btnTweetHome">
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
import marked from 'marked'

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
    const data = ref([])

    const compiledMarked = text => {
      return marked.parse(text, { sanitize: true })
    }

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

          console.log(res.data)
          console.log(nextData)
          data.value = nextData
          isLoading.value = false
        })
        .catch(e => console.log(e))

     // эмит лайка
    const sortBy = ref('date')
    const dataSortered = computed(() => {
      return [...data.value].sort((a, b) => {
        if (a[sortBy.value] < b[sortBy.value]) return 1
        if (a[sortBy.value] > b[sortBy.value]) return -1
      })
    })

    // отправка твита
    // const handleTweetSubmit = body => {
    //   data.value.push({
    //     id: data.value.length + 1,
    //     body,
    //     avatar:
    //       'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
    //     likes: 0,
    //     date: new Date(Date.now()).toLocaleString()
    //   })
    //   handleModalShow()
    // }

    const tweet = reactive ({
      avatar: `https://avatars.dicebear.com/api/male/${Date.now()}.svg?background=pink`,
      likes: 0,
      date: new Date(Date.now()).toLocaleString(),
      body: ''
    })

    const handleStore = () => {
      http
        .put ('/tweets/.json', tweet)
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


    const handleUpdate = tweet => {
      tweet.likes += 1

      http
        .post(`/tweets/${tweet.id}.json`, tweet)
        .then(() => {})
        .catch(e => console.log(e))
    }

    return {
      data,
      // handleLikeSubmit,
      // handleTweetSubmit,
      sortBy,
      handleUpdate,
      dataSortered,
      compiledMarked,
      isLoading,
      showModal,
      handleModalShow,
      handleStore,
      tweet
      }
  }
}
</script>
