import Loader from "../Loader/Loader.vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import {isEmptyString} from "bootstrap-vue/esm/utils/inspect";
import {trim} from "bootstrap-vue/esm/utils/string";

const CancelToken = axios.CancelToken;

export default {
    name: "SearchBar",
    components: {
        Loader
    },
    data() {
        return {
            user_name: "",
            cancelRequest: null,
            users: null,
            timeoutHandle: null,
            tweets: null,
            active_loading: false,
        };
    },
    methods: {
        findUsers: function(search_input) {
            const self = this;
            search_input = trim(search_input);

            self.cancelSearchUserRequest();

            if (isEmptyString(search_input)) {
                self.users = null;
            } else {
                self.timeoutHandle = window.setTimeout(function(){
                    self.searchUsers(search_input);
                }, 500);
            }
        },

        searchUsers: function (search_input) {
            const self = this;
            self.clearData();

            axios
                .get('/api/twitter-users/' + search_input, {
                    cancelToken: new CancelToken(function executor(c) {
                        self.cancelRequest = c;
                    })
                })
                .then(res => {
                    self.cancelRequest = null;
                    window.clearTimeout(self.timeoutHandle);
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
                        this.users = res.data;
                        this.$emit('change-no-results-message', (!this.users || this.users.length === 0));
                        this.$emit('change-loader-status', false);
                    }
                })
        },

        clearData: function () {
            this.users = null;
            this.$emit('users-founded');
            this.$emit('change-loader-status', true);
            this.$emit('change-no-results-message', false);
        },

        searchTweets: function (search_query, user_selected) {
            let self = this;
            search_query = trim(search_query);

            if (isEmptyString(search_query)) {
                return;
            }

            self.cancelSearchUserRequest();

            self.users = null;
            self.user_name = search_query;
            this.$emit('get-tweets', search_query, user_selected);
        },

        cancelSearchUserRequest: function () {
            if (this.cancelRequest) {
                this.cancelRequest();
            }

            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
        }
    }
}