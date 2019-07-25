import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-boost-burger123.firebaseio.com'
}
)

export default instance;