<template>
    <div class="container">
        <div class="row">
            <SearchBar/>
        </div>
        <div class="row articles">
            <div class="article" v-for="article in articles" v-bind:key="article.id">
                <TweetArticle v-bind:article="article"/>
            </div>
        </div>
    </div>
</template>

<script src="./twitter-widget.js"></script>
<style src="./twitter-widget.css"></style>
