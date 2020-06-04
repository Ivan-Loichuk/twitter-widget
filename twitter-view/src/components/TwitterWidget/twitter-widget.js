import axios from 'axios';
import TweetArticle from "./TweetArticle/TweetArticle";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader.vue"
import NoFoundMessage from "./NoFoundMessage/NoFoundMessage.vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: "TwitterWidget",
    components: {
        TweetArticle,
        SearchBar,
        Loader,
        NoFoundMessage
    },
    data() {
        return {
            user_tweets: null,
            active_loading: false,
            active_no_result_message: false,
        };
    },
    methods: {
        getUserTweets: function (screen_name) {
            this.active_loading = true;
            axios
                .get('/api/get/user-tweets/' + screen_name)
                .then(res => {
                    if (res.data.errors) {
                        for (let key in res.data.errors) {
                            this.$notify({
                                group: 'errors',
                                title: 'Error',
                                text: res.data.errors[key].message,
                                type: 'error',
                            });
                        }
                    } else {
                        this.user_tweets = res.data;
                        this.active_loading = false;
                        this.active_no_result_message = !this.user_tweets || this.user_tweets.length === 0;
                    }
                })
        },

        changeLoaderStatus: function (status = false) {
            this.active_loading = status
        },

        changeNoResultMessage: function (status = false) {
            this.active_no_result_message = status;
        }
    }
}