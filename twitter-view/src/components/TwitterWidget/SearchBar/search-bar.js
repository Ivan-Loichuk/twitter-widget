import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import {isEmptyString} from "bootstrap-vue/esm/utils/inspect";
import {trim} from "bootstrap-vue/esm/utils/string";

const CancelToken = axios.CancelToken;

export default {
    name: "SearchBar",
    data() {
        return {
            user_name: "",
            cancel: null,
            users: null,
            timeoutHandle: null,
            user_tweets: null,
            user_selected: false,
        };
    },
    mounted: function () {

    },
    methods: {
        findUsers: function(search_input) {
            const self = this;
            search_input = trim(search_input);

            if (self.timeoutHandle) {
                window.clearTimeout(self.timeoutHandle);
            }

            if (self.cancel) {
                self.cancel();
            }

            if (isEmptyString(search_input)) {
                self.users = null;
                self.user_selected = true;
            }

            if (!isEmptyString(search_input)) {
                self.timeoutHandle = window.setTimeout(function(){
                    self.searchUsers(search_input);
                }, 500);
            }
        },

        searchUsers: function (search_input) {
            const self = this;
            self.user_selected = false;

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
                        this.$emit('users-founded')
                    }
                })
        },

        searchUserTweets: function (screen_name) {
            let self = this;
            screen_name = trim(screen_name);

            if (isEmptyString(screen_name)) {
                return;
            }

            self.users = null;
            self.user_name = screen_name;
            this.$emit('user-selected', screen_name);
        }
    }
}