import axios from 'axios';
import TweetArticle from "./TweetArticle/TweetArticle";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader.vue";
import NoFoundMessage from "./NoFoundMessage/NoFoundMessage.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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
            since_id: null,
            checkNewTweetsInterval: null,
            has_new_tweet: false,
            search_query: null,
            user_selected: null,
        };
    },
    methods: {
        getTweets: function (search_query, user_selected) {
            const url = '/api/get/tweets/' + search_query + '?user_selected=' + parseInt(user_selected)
            let self = this;
            self.active_loading = true;
            self.active_no_result_message = false;
            self.tweets = null;
            self.search_query = search_query;
            self.user_selected = user_selected;

            axios
                .get(url)
                .then(res => {
                    if (res.data.errors) {
                        for (let key in res.data.errors) {
                            self.$notify({
                                group: 'errors',
                                title: 'Error',
                                text: res.data.errors[key].message,
                                type: 'error',
                            });
                        }
                    } else {
                        if (res.data.tweets && res.data.tweets.length !== 0) {
                            self.tweets = res.data.tweets;
                        }

                        if (res.data.max_id) {
                            self.since_id = res.data.max_id;
                            clearInterval(self.checkNewTweetsInterval);
                        }

                        self.active_loading = false;
                        self.active_no_result_message = !self.tweets || self.tweets.length === 0;
                        self.has_new_tweet = false;

                        self.checkNewTweetsInterval = setInterval(function() {
                            self.checkNewTweets(url);
                        }, 10000);
                    }
                })
        },

        changeLoaderStatus: function (status = false) {
            this.active_loading = status
        },

        changeNoResultMessage: function (status = false) {
            this.active_no_result_message = status;
        },

        checkNewTweets: function (main_url) {
            const url = main_url + '&since_id=' + this.since_id + '&classic_mode=1';

            axios
                .get(url)
                .then(res => {
                    if (!res.data.errors) {
                        if (res.data.tweets && res.data.tweets.length !== 0) {
                            this.has_new_tweet = true;
                            clearInterval(this.checkNewTweetsInterval);
                        }
                    }
                })
        }
    }
}