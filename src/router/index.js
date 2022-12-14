import {
    createRouter,
    createWebHistory
} from 'vue-router'
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [{
            path: '/',
            name: 'Home',
            component: () => import('../views/home.vue')
        },
        {
            path: '/editDiv',
            name: 'EditDiv',
            component: () => import('../views/editDiv/index.vue')
        }, {
            path: '/cs',
            name: 'CS',
            component: () => import('../views/cs/index.vue')
        },
    ]
})

export default router;