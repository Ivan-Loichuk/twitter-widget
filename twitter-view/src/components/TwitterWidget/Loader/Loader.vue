<template>
    <div class="container">
        <div class="spinner-border" role="status" v-if="active_loading">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script src="./loader.js"></script>
<style src="./loader.css"></style>
