import axios from 'axios';

const config = {
  header: {
      'Content-Type': 'application/json'
  }
};

export default {
    fetchSocials: () => {
        return axios.get('http://localhost:8000/api/socials');
    },
    updateSocials: (social) => {
        return axios.put(`http://localhost:8000/api/socials/${social.id}`, social, config);
    },
    createSocials: (social) => {
        return axios.post('http://localhost:8000/api/socials', social, config);
    },
    deleteSocials: (social) => {
        return axios.delete(`http://localhost:8000/api/socials/${social.id}`);
    }
}
