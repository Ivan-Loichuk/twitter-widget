<template>
    <div class="container widget">
        <div class="row">
            <div class="container hello-message">
                <h4>Type user name and display user tweets</h4>
                <p>or click Enter and find all recent Tweets by phrase</p>
            </div>
        </div>

        <div class="row">
            <SearchBar
                    v-on:user-selected="getUserTweets"
                    v-on:input_entered="getRelatedTweets"
                    v-on:users-founded="tweets = null"
                    v-on:change-loader-status="changeLoaderStatus"
                    v-on:change-no-results-message="changeNoResultMessage"
            />
        </div>
        <div class="row">
            <Loader v-bind:active_loading="active_loading"/>
            <NoFoundMessage v-bind:active_message="active_no_result_message"/>
            <div class="article" v-for="article in tweets" v-bind:key="article.id">
                <TweetArticle v-bind:article="article"/>
            </div>
        </div>
    </div>
</template>

<script src="./twitter-widget.js"></script>
<style src="./twitter-widget.css"></style>
