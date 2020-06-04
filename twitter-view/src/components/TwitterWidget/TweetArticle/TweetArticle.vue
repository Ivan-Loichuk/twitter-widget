<template>
    <div class="tweet">
        <div class="tweet-content">
            <a class="tweet-profile" v-bind:href="author_url">
                <img class="tweet-avatar" v-bind:src="article.user.profile_image_url">

                <strong class="tweet-username">
                    [fullname]
                </strong>

                <span class="tweet-screen-name">
                @<b>[username]</b>
                </span>

                <span class="tweet-created-time">- [timestamp]</span>

            </a>

            <div class="tweet-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam ipsum, finibus ac est sed, vestibulum condimentum neque. Sed eget iaculis.
            </div>

        </div>

        <div class="media">
            <img class="media-img" src="http://placekitten.com/500/400">
        </div>
    </div>
</template>

<script src="./tweet-article.js"></script>
<style src="./tweet-article.css"></style>
