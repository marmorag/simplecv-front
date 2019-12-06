import axios from 'axios';

const config = {
    // crossdomain: true
};

export default {
    authUser: (username, password) => {
        return axios.post('http://localhost:8000/api/auth', { login: username, password: password }, config);
    },
}
