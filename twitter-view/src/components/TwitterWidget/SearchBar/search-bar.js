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
            cancel: null,
            users: null,
            timeoutHandle: null,
            user_tweets: null,
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
                        self.cancel = c;
                    })
                })
                .then(res => {
                    self.cancel = null;
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
        },

        searchUserTweets: function (screen_name) {
            let self = this;
            screen_name = trim(screen_name);

            if (isEmptyString(screen_name)) {
                return;
            }

            self.cancelSearchUserRequest();

            self.users = null;
            self.user_name = screen_name;
            this.$emit('user-selected', screen_name);
        },

        cancelSearchUserRequest: function () {
            if (this.cancel) {
                this.cancel();
            }

            if (this.timeoutHandle) {
                window.clearTimeout(this.timeoutHandle);
            }
        }
    }
}