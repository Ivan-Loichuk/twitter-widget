import axios from 'axios';
import TweetArticle from "./TweetArticle/TweetArticle";
import SearchBar from "./SearchBar/SearchBar";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: "TwitterWidget",
    components: {
        TweetArticle,
        SearchBar
    },
    data() {
        return {
            user_tweets: null,
        };
    },
    mounted: function () {

    },
    methods: {
        getUserTweets: function (screen_name) {
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
                    }
                })
        },
    }
}