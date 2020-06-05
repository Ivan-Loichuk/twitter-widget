import axios from 'axios';
import TweetArticle from "./TweetArticle/TweetArticle";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader.vue";
import NoFoundMessage from "./NoFoundMessage/NoFoundMessage.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const CancelToken = axios.CancelToken;

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
            cancelRequest: null,
        };
    },
    methods: {
        getTweets: function (search_query, user_selected) {
            const url = '/api/get/tweets/' + search_query + '?user_selected=' + parseInt(user_selected)
            let self = this;
            self.setParamsBeforeRequest();
            self.search_query = search_query;
            self.user_selected = user_selected;

            axios
                .get(url, {
                    cancelToken: new CancelToken(function executor(c) {
                        self.cancelRequest = c;
                    })
                })
                .then(res => {
                    self.cancelRequest = null;
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
                        }

                        self.setParamsAfterRequest();

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

        setParamsBeforeRequest: function() {
            this.active_loading = true;
            this.active_no_result_message = false;
            this.tweets = null;

            if (this.cancelRequest) {
                this.cancelRequest();
            }
        },

        setParamsAfterRequest: function() {
            this.active_loading = false;
            this.active_no_result_message = !this.tweets || this.tweets.length === 0;
            this.has_new_tweet = false;
            clearInterval(this.checkNewTweetsInterval);
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