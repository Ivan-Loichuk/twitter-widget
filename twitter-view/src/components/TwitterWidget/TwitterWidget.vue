<template>
    <div class="container widget">
        <div class="row">
            <div class="container hello-message" id="top">
                <h4>Type user name to display his tweets</h4>
                <p>or type phrase and press Enter to find all recent tweets</p>
            </div>
        </div>

        <div class="row">
            <SearchBar
                    v-on:get-tweets="getTweets"
                    v-on:users-founded="hideTweets"
                    v-on:change-loader-status="changeLoaderStatus"
                    v-on:change-no-results-message="changeNoResultMessage"
                    v-on:stop-checking-new-tweets="stopCheckingNewTweets"
            />
        </div>
        <div class="row">
            <Loader v-bind:active_loading="active_loading"/>
            <NoFoundMessage v-bind:active_message="active_no_result_message"/>

            <div class="text-center new-tweet-label">
                <a href="#top"
                   class="btn"
                   v-if="has_new_tweet"
                   v-on:click="getTweets(search_query, user_selected)">
                    Display new tweets
                </a>
            </div>

            <div class="article" v-for="article in tweets" v-bind:key="article.id">
                <TweetArticle v-bind:article="article"/>
            </div>
        </div>
    </div>
</template>

<script src="./twitter-widget.js"></script>
<style src="./twitter-widget.css"></style>
