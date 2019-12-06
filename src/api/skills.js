import axios from 'axios';

const config = {
    // crossdomain: true
};

export default {
    fetchSkills: () => {
        return axios.get('http://localhost:8000/api/skills', config);
    },
}
