import axios from 'axios'

export default axios.create({
    baseURL:
        'https://twitter-11e2c-default-rtdb.europe-west1.firebasedatabase.app/',
    header: {
        'Content-type': 'application/json'
    }
})