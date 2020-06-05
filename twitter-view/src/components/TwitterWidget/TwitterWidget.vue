<template>
    <div class="container widget">
        <div class="row">
            <div class="container hello-message" id="top">
                <h4>Type user name to display their tweets</h4>
                <p>or press Enter to find all recent tweets by phrase</p>
            </div>
        </div>

        <div class="row">
            <SearchBar
                    v-on:get-tweets="getTweets"
                    v-on:users-founded="tweets = null"
                    v-on:change-loader-status="changeLoaderStatus"
                    v-on:change-no-results-message="changeNoResultMessage"
            />
        </div>
        <div class="row">
            <Loader v-bind:active_loading="active_loading"/>
            <NoFoundMessage v-bind:active_message="active_no_result_message"/>
            <a href="#top" class="new-tweet-label" v-if="has_new_tweet" v-on:click="getTweets(search_query, user_selected)">Go top</a>

            <div class="article" v-for="article in tweets" v-bind:key="article.id">
                <TweetArticle v-bind:article="article"/>
            </div>
        </div>
    </div>
</template>

<script src="./twitter-widget.js"></script>
<style src="./twitter-widget.css"></style>
