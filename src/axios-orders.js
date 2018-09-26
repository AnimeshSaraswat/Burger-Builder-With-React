import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://my-reactive-burger.firebaseio.com/'
});

export default instance;