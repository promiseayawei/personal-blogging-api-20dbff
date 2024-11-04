import { createRouter, createWebHistory } from 'vue-router';
import PostList from '../components/PostList.vue';
import PostDetail from '../components/PostDetail.vue';
import NewPost from '../components/NewPost.vue';

const routes = [
    {
        path: '/',
        name: 'PostList',
        component: PostList,
    },
    {
        path: '/posts/:id',
        name: 'Post',
        component: PostDetail,
    },
    {
        path: '/new',
        name: 'NewPost',
        component: NewPost,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
