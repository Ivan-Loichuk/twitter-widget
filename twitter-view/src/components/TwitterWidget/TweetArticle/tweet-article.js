import Media from "./Media/Media.vue";
import {TWITTER_WIDGET} from "../../../config/Constants";

export default {
    name: "TweetArticle",
    props: ['article'],
    components: {
        Media,
    },
    data() {
        return {
            twitter_url: TWITTER_WIDGET.TWITTER_URL,
        };
    },
}