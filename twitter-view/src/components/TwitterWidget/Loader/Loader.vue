<template>
    <div class="container loader" v-if="active_loading">
        <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script src="./loader.js"></script>
<style src="./loader.css"></style>
