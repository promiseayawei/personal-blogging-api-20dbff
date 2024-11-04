<template>
    <div>
        <h1>Blog Posts</h1>
        <router-link to="/new">Create New Post</router-link>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <router-link :to="{ name: 'Post', params: { id: post.id } }">
                    {{ post.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                this.posts = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
