<template>
    <div class="container">
        <div class="row">
            <form action="">
                <input type="search" class="form-control" value="" v-model="search" v-on:input="findUsers(search)" placeholder="Find user">
            </form>
        </div>
        <div class="row">
            <p class="autocomplete-message">No results</p>
            <ul class="autocomplete-list">
            </ul>
        </div>
    </div>
</template>

<script src="./search-bar.js"></script>
<style src="./search-bar.css"></style>
