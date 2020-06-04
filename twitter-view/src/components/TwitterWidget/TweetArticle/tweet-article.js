import Media from "./Media/Media.vue";

export default {
    name: "TweetArticle",
    props: ['article'],
    components: {
        Media,
    },
    data() {
        return {
            tweet_data: {
                screen_name: null,
            },
            twitter_url: 'https://twitter.com/',
        };
    },
    mounted() {
        this.tweet_data = this.article.retweeted_profile ?? this.article.user;
    },
}