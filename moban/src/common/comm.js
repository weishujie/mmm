import axios from 'axios'
const service = axios.create({
    baseURL: 'http://39.105.27.87:3088',
    timeout: 5000
});

export default service
// export default axios