<template>
    <div class="tweet">
        <div class="tweet-content">
            <a class="tweet-profile" v-bind:href="this.twitter_url + article.user.screen_name" target="_blank">
                <img class="tweet-avatar"
                     v-bind:src="article.user.profile_image_url"
                     v-bind:alt="article.user.user_name"
                />

                <strong class="tweet-username">
                    {{ article.user.user_name }}
                </strong>

                <span class="tweet-screen-name">
                    @<b>{{ article.user.screen_name }}</b>
                </span>

                <span class="tweet-created-time">- {{ article.create_at}}</span>
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
