<template>
    <div class="tweet">
        <div class="tweet-content">
            <a class="tweet-profile" v-bind:href="this.twitter_url + tweet_data.screen_name">
                <img class="tweet-avatar"
                     v-bind:src="tweet_data.profile_image_url">

                <strong class="tweet-username">
                    {{ tweet_data.user_name }}
                </strong>

                <span class="tweet-screen-name">
                @<b>{{ tweet_data.screen_name }}</b>
                </span>

                <span class="tweet-created-time">- {{ article.create_at}}</span>
                <span class="tweet-retweet-label">{{ article.retweeted_profile ? '(retweet)' : '' }}</span>
            </a>

            <div class="tweet-text">
                {{ article.text }}
            </div>

        </div>

        <Media v-bind:media="article.media"/>
    </div>
</template>

<script src="./tweet-article.js"></script>
<style src="./tweet-article.css"></style>
