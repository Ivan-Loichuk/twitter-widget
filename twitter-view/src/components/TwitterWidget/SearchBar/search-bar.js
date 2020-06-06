import Loader from "../Loader/Loader.vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import {isEmptyString} from "bootstrap-vue/esm/utils/inspect";
import {trim} from "bootstrap-vue/esm/utils/string";

import {TWITTER_WIDGET} from '../../../config/Constants';

const CancelToken = axios.CancelToken;

export default {
    name: "SearchBar",
    components: {
        Loader
    },
    data() {
        return {
            user_name: "",
            cancel_request: null,
            users: [],
            timeout_handle: null,
            tweets: [],
            active_loading: false,
        };
    },
    methods: {
        findUsers: function (search_input) {
            search_input = trim(search_input);

            this.cancelSearchUserRequest();

            if (isEmptyString(search_input)) {
                this.users = [];
            } else {
                this.timeout_handle = window.setTimeout(() => {
                    this.searchUsers(search_input);
                }, TWITTER_WIDGET.CANCEL_TIMEOUT);
            }
        },

        searchUsers: function (search_input) {
            this.clearData();
            axios
                .get(TWITTER_WIDGET.GET_USERS_API_URL + search_input, {
                    cancelToken: new CancelToken((c) => {
                        this.cancel_request = c;
                    })
                })
                .then(res => {
                    this.cancel_request = null;
                    window.clearTimeout(this.timeout_handle);
                    if (res.data.errors) {
                        res.data.errors.map(({message}) => this.errorNotification(message));
                    } else {
                        this.users = res.data;
                        this.$emit('change-no-results-message', (!this.users || this.users.length === 0));
                        this.$emit('change-loader-status', false);
                    }
                })
        },

        clearData: function () {
            this.users = [];
            this.$emit('users-founded');
            this.$emit('change-loader-status', true);
            this.$emit('change-no-results-message', false);
            this.$emit('stop-checking-new-tweets');
        },

        searchTweets: function (search_query, user_selected) {
            search_query = trim(search_query);

            if (isEmptyString(search_query)) {
                return;
            }

            this.cancelSearchUserRequest();

            this.users = [];
            this.user_name = search_query;
            this.$emit('get-tweets', search_query, user_selected);
        },

        cancelSearchUserRequest: function () {

            if (this.cancel_request && typeof(this.cancel_request) == "function") {
                this.cancel_request();
            }

            if (this.timeout_handle) {
                window.clearTimeout(this.timeout_handle);
            }
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