export default {
    name: "TweetArticle",
    props: ['article'],
    data() {
        return {
            twitter_url: 'https://twitter.com/',
            author_url: null,
        };
    },
    mounted() {
        const { entities } = this.article;
        const { user_mentions } = entities;
        //const { retweeted_status } = extended_entities;

        if (user_mentions.length !== 0) {
            this.author_url = this.twitter_url + user_mentions[0].screen_name;
        }

    }

}