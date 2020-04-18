import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tokigames-challenge.herokuapp.com/'
});

export default instance;
