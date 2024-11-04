<template>
    <div>
        <h1>Create New Post</h1>
        <form @submit.prevent="createPost">
            <div>
                <label for="title">Title:</label>
                <input type="text" v-model="title" required />
            </div>
            <div>
                <label for="content">Content:</label>
                <textarea v-model="content" required></textarea>
            </div>
            <div>
                <label for="image">Image:</label>
                <input type="file" @change="handleFileUpload" />
            </div>
            <button type="submit">Create Post</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            content: '',
            image: null,
        };
    },
    methods: {
        handleFileUpload(event) {
            this.image = event.target.files[0];
        },
        async createPost() {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.content);
            if (this.image) {
                formData.append('image', this.image);
            }

            try {
                await axios.post('http://localhost:5000/api/posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
