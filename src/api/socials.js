import axios from 'axios';

const config = {
  headers: {
      'Content-Type': 'application/json'
  }
};

const url = `${process.env.VUE_APP_API_URL}/api/socials`;

export default {
    fetchSocials: () => {
        return axios.get(url);
    },
    updateSocials: (social) => {
        return axios.put(`${url}/${social.id}`, social, config);
    },
    createSocials: (social) => {
        return axios.post(url, social, config);
    },
    deleteSocials: (social) => {
        return axios.delete(`${url}/${social.id}`);
    }
}
