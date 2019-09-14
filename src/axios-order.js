import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://butmill.firebaseio.com/'
});
export default instance;