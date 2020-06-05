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
            tweets: null,
            active_loading: false,
            active_no_result_message: false,
        };
    },
    methods: {
        getUserTweets: function (screen_name) {
            const url = '/api/get/user-tweets/' + screen_name;

            this.getTweetsFromServer(url);
        },

        getRelatedTweets: function (search_query) {
            const url = '/api/get/tweets/' + search_query;

            this.getTweetsFromServer(url);
        },

        getTweetsFromServer: function(url) {
            this.active_loading = true;
            this.active_no_result_message = false;
            this.tweets = null;

            axios
                .get(url)
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
                        this.tweets = res.data;
                        this.active_loading = false;
                        this.active_no_result_message = !this.tweets || this.tweets.length === 0;
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