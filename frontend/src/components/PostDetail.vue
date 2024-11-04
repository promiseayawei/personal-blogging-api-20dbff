<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <img v-if="post.image" :src="post.image" alt="Post Image" />
        <p>{{ post.content }}</p>
        <router-link to="/">Back to Posts</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: null,
        };
    },
    async created() {
        await this.fetchPost();
    },
    methods: {
        async fetchPost() {
            const { id } = this.$route.params;
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                this.post = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
