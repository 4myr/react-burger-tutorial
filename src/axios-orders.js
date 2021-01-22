import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger2-c5eb5-default-rtdb.firebaseio.com/'
});

export default instance;