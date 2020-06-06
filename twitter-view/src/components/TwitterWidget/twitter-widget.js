import axios from 'axios';
import TweetArticle from "./TweetArticle/TweetArticle";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader.vue";
import NoFoundMessage from "./NoFoundMessage/NoFoundMessage.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {TWITTER_WIDGET} from "../../config/Constants";

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
            tweets: [],
            active_loading: false,
            active_no_result_message: false,
            since_id: 0,
            check_new_tweets_interval: null,
            has_new_tweet: false,
            search_query: "",
            user_selected: false,
            cancel_request: null,
        };
    },
    methods: {
        getTweets: function (search_query, user_selected) {
            const url = TWITTER_WIDGET.GET_TWEETS_API_URL + search_query + '?user_selected=' + parseInt(user_selected)
            this.setParamsBeforeSendingRequest();
            this.search_query = search_query;
            this.user_selected = user_selected;

            axios
                .get(url, {
                    cancelToken: new CancelToken((c) => {
                        this.cancel_request = c;
                    })
                })
                .then(res => {
                    this.cancel_request = null;
                    if (res.data.errors) {
                        res.data.errors.map(({message}) => this.errorNotification(message));
                    } else {
                        if (res.data.tweets && res.data.tweets.length !== 0) {
                            this.tweets = res.data.tweets;
                        }

                        if (res.data.max_id) {
                            this.since_id = res.data.max_id;
                        }

                        this.setParamsAfterSendingRequest();

                        this.check_new_tweets_interval = setInterval(() => {
                            this.checkNewTweets(url);
                        }, TWITTER_WIDGET.CHECKING_NEW_TWEETS_INTERVAL);
                    }
                }).catch((error) => {
                    this.errorNotification(error);
                })
        },

        changeLoaderStatus: function (status = false) {
            this.active_loading = status
        },

        changeNoResultMessage: function (status = false) {
            this.active_no_result_message = status;
        },

        hideTweets: function () {
            this.tweets = [];
        },

        stopCheckingNewTweets: function (has_new_tweet = false) {
            clearInterval(this.check_new_tweets_interval);
            this.has_new_tweet = has_new_tweet;
        },

        setParamsBeforeSendingRequest: function() {
            this.active_loading = true;
            this.active_no_result_message = false;
            this.tweets = null;

            if (this.cancel_request && typeof(this.cancel_request) == "function") {
                this.cancel_request();
            }
        },

        setParamsAfterSendingRequest: function() {
            this.active_loading = false;
            this.active_no_result_message = !this.tweets || this.tweets.length === 0;
            this.stopCheckingNewTweets()
        },

        checkNewTweets: function (main_url) {
            const url = main_url + '&since_id=' + this.since_id + '&classic_mode=1';

            axios
                .get(url)
                .then(res => {
                    if (!res.data.errors) {
                        if (res.data.tweets && res.data.tweets.length !== 0) {
                            this.stopCheckingNewTweets(true)
                        }
                    }
                }).catch((error) => {
                    this.errorNotification(error);
                })
        },

        errorNotification: function (message) {
            this.$notify({
                group: 'errors',
                title: 'Error',
                text: message,
                type: 'error',
            })
        }
    }
}