import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import CookiePolicy from '@/pages/CookiePolicy'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import Terms from '@/pages/TermsAndConditions'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Main from '@/views/Main'
import Signup from '@/components/Signup'
import ShapeLeft from '@/components/ShapeLeft'
import ShapeRight from '@/components/ShapeRight'
import Login from '@/components/Login'
import Snippets from '@/views/Snippets'
import AddSnippet from '@/views/AddSnippet'
import Profile from '@/views/Profile'
import Statistics from '@/views/Statistics'
import store from "../store/store";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'Landing',
            components: {
                left: ShapeLeft,
                right: ShapeRight,
                bottomLeft: Signup,
                bottomRight: Login
            },
            meta: {
                guest: true
            },

        },
        {
            path: '/forgotpassword',
            name: 'ForgotPassword',
            component: ForgotPassword,
        },
        {
            path: '/resetpassword',
            name: 'ResetPassword',
            component: ResetPassword,
            meta: {
                requiresAuth: true
            },
            beforeEnter: (to, from, next) => {
                if (to.query.rt === store.state.verificationtoken) {
                    next();
                } else {
                    next('/');
                }
                next();
            },
        },
        {
            path: '/privacypolicy',
            name: 'PrivacyPolicy',
            component: PrivacyPolicy,
            beforeEnter: (to, from, next) => {
                if (to.query.rt === store.state.verificationtoken) {
                    next();
                } else {
                    next('/');
                }
                next();
            },
        },
        {
            path: '/terms',
            name: 'Terms',
            component: Terms,
            beforeEnter: (to, from, next) => {
                if (to.query.rt === store.state.verificationtoken) {
                    next();
                } else {
                    next('/');
                }
                next();
            },
        },
        {
            path: '/cookiepolicy',
            name: 'CookiePolicy',
            component: CookiePolicy,
            beforeEnter: (to, from, next) => {
                if (to.query.rt === store.state.verificationtoken) {
                    next();
                } else {
                    next('/');
                }
                next();
            },

        },
        {
            path: '/admin',
            name: 'Admin',
            component: Home,
            meta: {
                requiresAuth: true,
                is_admin: true,
            },
            beforeEnter: (to, from, next) => {
                if (to.matched.some(route => route.meta.requiresAuth && route.meta.is_admin)) {
                    if ((store.state.token) && (store.state.User.role.some(role => role === 'admin'))) {
                        next();
                    } else {
                        next('/');
                    }
                }
                next();
            },
            children: [
                {
                    path: 'statistics',
                    name: 'Statistics',
                    component: Statistics
                },
            ]
        },
        {
            path: '/users',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            },
            beforeEnter: (to, from, next) => {
                if (to.matched.some(route => route.meta.requiresAuth)) {
                    if (store.state.token) {
                        next();
                    } else {
                        next('/');
                    }
                }
                next();
            },
            children: [
                {
                    path: 'home',
                    name: 'Main',
                    component: Main
                },
                {
                    path: 'snippets',
                    name: 'Snippets',
                    component: Snippets
                },
                {
                    path: 'addSnippet',
                    name: 'AddSnippet',
                    component: AddSnippet
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: Profile
                }
            ]
        }
    ]

})