import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ilearn16-f1f1d.firebaseio.com/'
});

export default instance;