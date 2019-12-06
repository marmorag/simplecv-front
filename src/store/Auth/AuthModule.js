import AuthAPI from '../../api/auth';
import axios from 'axios';

const state = {
    user: {
        connection_token: '',
        username: '',
        logged: false,
    },
    isRunningCall: false,
    error: {
        status: false,
        message: '',
    },
};

const mutations = {
    INIT: (state , {user}) => {
        state.user = user;

        if (state.user.logged) {
            axios.defaults.headers.common['X-AUTH-TOKEN'] = state.user.connection_token;
        }
    },
    LOG_USER: (state, { token, name }) => {
        state.user.connection_token = token;
        state.user.username = name;
        state.user.logged = true;

        axios.defaults.headers.common['X-AUTH-TOKEN'] = state.user.connection_token;
        window.sessionStorage.setItem('user', JSON.stringify(state.user));
    },
    UNLOG_USER: (state) => {
        state.user.connection_token = '';
        state.user.username = '';
        state.user.logged = false;

        delete axios.defaults.headers.common['X-AUTH-TOKEN'];
        window.sessionStorage.removeItem('user');
    },
    LOADING: (state, status) => {
        state.isRunningCall = status;
    },
    ERROR: (state, { status, message }) => {
        state.error.status = status;
        state.error.message = message;
    },
};

const actions = {
    initStore(store) {
        return new Promise(() => {
            let user = window.sessionStorage.getItem('user');
            if (user !== null && user !== undefined){
                store.commit('INIT', {user: JSON.parse(user)});
            }
        });
    },
    authUser(store, { username, password }) {
        return new Promise((resolve, reject) => {
            AuthAPI.authUser(username, password)
                .then((req) => {
                    let loggedUser = {
                        token: req.data.data.token,
                        name: username,
                    };

                    store.commit('LOG_USER', loggedUser);
                    store.commit('LOADING', false);
                    resolve();
                })
                .catch((error) => {
                    store.commit('UNLOG_USER');
                    store.commit('LOADING', false);
                    reject(error.response.data);
                });
        })
    },
    logoutUser(store) {
        store.commit('UNLOG_USER');
    },
    registerUser(store, {user}){
        return new Promise((resolve, reject) => {
            AuthAPI.registerUser(user)
                .then((req) => {
                    let loggedUser = {
                        token: req.data.data.token,
                        name: user.email,
                    };
                    store.commit('LOG_USER', loggedUser);
                    store.commit('LOADING', false);

                    resolve();
                })
                .catch((error) => {
                    store.commit('UNLOG_USER');
                    store.commit('LOADING', false);

                    reject(error.response.data.message);
                });
        })
    }
};

const getters = {
    getUser: state => state.user,
    isUserLogged: state => state.user.logged,
    isLoading: state => state.isRunningCall,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
