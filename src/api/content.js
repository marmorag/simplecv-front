import axios from 'axios';

const config = {
    header: {
        'Content-Type': 'application/json'
    }
};
const url = `${process.env.VUE_APP_API_URL}/api/contents`;

export default {
    fetch: () => {
        return axios.get(url);
    },
    update: (content) => {
        return axios.put(`${url}/${content.id}`, content, config);
    },
}