import axios from 'axios'

export default {
    fetchRandomImage(count = 3) {
        return new Promise((resolve) => {
            let requestPool = [];
            let responsePool = [];

            for (let i = 0; i < count; i++) {
                let url = `https://api.unsplash.com/photos/random?client_id=${process.env.VUE_APP_UNSPLASH_ACCESS_KEY}`;
                requestPool.push(axios.get(url));
            }

            axios.all(requestPool).then(axios.spread((...responses) => {
                for (let response of responses) {
                    responsePool.push(response.data.urls.small);
                }
            }));

            resolve(responsePool)
        });
    }
}
