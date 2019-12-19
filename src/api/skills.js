import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const url = `${process.env.VUE_APP_API_URL}/api/skills`;

export default {
    fetchSkills: () => {
        return axios.get(url, config);
    },
    updateSkills: (skill) => {
        return axios.put(`${url}/${skill.id}`, skill, config);
    },
    createSkills: (skill) => {
        return axios.post(url, skill, config);
    },
    deleteSkills: (skill) => {
        return axios.delete(`${url}/${skill.id}`);
    }
}
