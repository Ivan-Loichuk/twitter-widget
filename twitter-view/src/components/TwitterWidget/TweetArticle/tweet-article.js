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
                author_url: null,
                profile_img_url: null,
                profile_name: null,
                profile_screen_name: null,
            },
            twitter_url: 'https://twitter.com/',
        };
    },
    mounted() {
        this.transformTweetData();
    },
    methods: {
        transformTweetData: function () {
            if (this.article.retweeted_profile) {
                this.tweet_data.author_url = this.twitter_url + this.article.retweeted_profile.screen_name;
                this.tweet_data.profile_name = this.article.retweeted_profile.user_name;
                this.tweet_data.profile_screen_name = this.article.retweeted_profile.screen_name;
                this.tweet_data.profile_img_url = this.article.retweeted_profile.profile_image_url;
            } else {
                this.tweet_data.author_url = this.twitter_url + this.article.user.screen_name;
                this.tweet_data.profile_name = this.article.user.user_name;
                this.tweet_data.profile_screen_name = this.article.user.screen_name;
                this.tweet_data.profile_img_url = this.article.user.profile_image_url;
            }
        }
    }

}