<template>
    <div class="container search-bar">
        <div class="row">
            <form action="" class="search-bar-form">
                <input type="search" class="form-control" value="" v-model="user_name" v-on:input="findUsers(user_name)" placeholder="Find user">
            </form>
        </div>
        <div class="row">
            <p class="autocomplete-message" v-if="!users && user_selected">No results</p>
            <ul class="autocomplete-list" v-else>
                <li class="user" v-for="user in users" v-bind:key="user.id">
                    <a href="#" class="inner" v-on:click="searchUserTweets(user.screen_name)">
                        <div class="li-img">
                            <img v-bind:src="user.profile_image_url"/>
                        </div>
                        <div class="li-text">
                            <h5 class="li-head">{{ user.name }} <span>(@{{ user.screen_name }})</span></h5>
                            <div class="li-sub">
                                <p>{{ user.location}}</p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="./search-bar.js"></script>
<style src="./search-bar.css"></style>
