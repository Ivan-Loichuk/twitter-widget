<template>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Created at</th>
            <th scope="col">User name</th>
            <th scope="col">Content</th>
            <th scope="col">Screen name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tweet in twitter_news" v-bind:key="tweet.id">
            <th scope="row">{{tweet.created_at}}</th>
            <td>{{tweet.user.name}}</td>
            <td>{{tweet.text}}</td>
            <td>{{tweet.user.screen_name}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {
        name: "TwitterNews",
        data() {
            return {
                twitter_news: null,
            };
        },
        mounted: function () {
            this.getTwitterNews()
        },
        methods: {
            getTwitterNews: function(){
                axios
                    .get('/api/twitter-news')
                    .then(res => {
                        this.twitter_news = res.data;
                        console.log(this.twitter_news );
                    })
            },
        }
    }
</script>

<style scoped>
    h3 {
        margin-bottom: 5%;
    }
</style>