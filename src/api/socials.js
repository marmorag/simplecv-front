import axios from 'axios';


export default {
    fetchSocials: () => {
        return axios.get('http://localhost:8000/api/socials');
    },
    updateSocials: (social) => {
        return axios.put(`http://localhost:8000/api/socials/${social.id}`, social);
    },
    createSocials: (social) => {
        return axios.post('http://localhost:8000/api/socials', social);
    },
    deleteSocials: (social) => {
        return axios.delete(`http://localhost:8000/api/socials/${social.id}`);
    }
}
