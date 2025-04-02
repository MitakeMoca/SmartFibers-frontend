import axios from 'axios';

// 后端的URL
axios.defaults.baseURL = 'http://localhost:8084' 
// 携带跨域凭证，在注册域名之后才有用
axios.defaults.withCredentials = false 


export default axios