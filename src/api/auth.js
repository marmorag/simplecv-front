import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const url = `${process.env.VUE_APP_API_URL}/api/auth`;

export default {
    authUser: (username, password) => {
        return axios.post(url, { login: username, password: password }, config);
    },
}
