<template>
    <div class="container widget">
        <div class="row">
            <SearchBar
                    v-on:user-selected="getUserTweets"
                    v-on:users-founded="user_tweets = null"
            />
        </div>
        <div class="row">
            <div class="article" v-for="article in user_tweets" v-bind:key="article.id">
                <TweetArticle v-bind:article="article"/>
            </div>
        </div>
    </div>
</template>

<script src="./twitter-widget.js"></script>
<style src="./twitter-widget.css"></style>
