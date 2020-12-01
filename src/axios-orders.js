import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-1e00c.firebaseio.com/'
});

export default instance;