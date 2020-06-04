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
            articles: null,
        };
    },
    mounted: function () {
        this.getTwitterNews()
    },
    methods: {
        getTwitterNews: function(){
            axios
                .get('/api/twitter-news')
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
                        this.articles = res.data;
                    }
                })
        },
    }
}