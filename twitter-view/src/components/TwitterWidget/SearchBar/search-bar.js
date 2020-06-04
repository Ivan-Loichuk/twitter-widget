import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";

const CancelToken = axios.CancelToken;

export default {
    name: "SearchBar",
    data() {
        return {
            search: "",
            cancel: null,
        };
    },
    mounted: function () {

    },
    methods: {
        findUsers: function(search_input) {
            const self = this;

            if (self.cancel) {
                self.cancel();
                self.cancel = null;
            }
            axios
                .get('/api/twitter-users/' + search_input, {
                    cancelToken: new CancelToken(function executor(c) {
                        self.cancel = c;
                    })
                })
                .then(res => {
                    self.cancel = null;
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
                        this.articles = res.data;
                    }
                })
        },
    }
}