<template>
    <div class="container search-bar">
        <div class="row">
            <form class="search-bar-form">
                <input type="search"
                       class="form-control" value=""
                       v-model="user_name"
                       v-on:input="findUsers(user_name)"
                       v-on:keydown.enter.prevent="searchTweets(user_name, 0)"
                       placeholder="Start typing"
                >
            </form>
        </div>
        <div class="row">
            <ul class="autocomplete-list" v-if="users && users.length !== 0">
                <li class="user" v-for="user in users" v-bind:key="user.id">
                    <a href="#" class="inner" v-on:click="searchTweets(user.screen_name, 1)">
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
