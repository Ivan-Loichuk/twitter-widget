<template>
    <div class="container no-found-message" v-if="active_message">
        <img :src="no_results_img_path" alt="">
    </div>
</template>

<script src="./no-found-message.js"></script>
<style src="./no-found-message.css"></style>
