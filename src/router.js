import Vue from 'vue';
import store from './store/store';
import Router from 'vue-router';

Vue.use(Router);

let router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/home',
            name: 'home',
            component: require('./views/Home.vue').default,
            meta: {
                title: 'Guillaume Marmorat',
                authPage: false,
                requireAuth: false,
            }
        },
        {
            path: '/edit',
            name: 'edit',
            component: require('./views/Edit.vue').default,
            meta: {
                title: 'Edition',
                authPage: false,
                requireAuth: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: require('./views/Login.vue').default,
            meta: {
                title: 'Connexion',
                authPage: true,
                requireAuth: false,
            }
        },
        {
            path: '',
            redirect: { name: 'home' }
        },
    ],
});

// Auth verification
router.beforeEach((to, from, next) => {
    store.dispatch('auth/initStore');

    if (to.matched.some(record => record.meta.requireAuth) && !store.getters['auth/isUserLogged']) {
        // requireAuth && !userLogged => redirect to login
        next({name: 'login'});
    } else if (to.matched.some(record => record.meta.authPage) && store.getters['auth/isUserLogged']) {
        // is auth page && userLogged => redirect to home
        next({name: 'home'});
    } else {
        // default case
        next();
    }
});

export default router;
