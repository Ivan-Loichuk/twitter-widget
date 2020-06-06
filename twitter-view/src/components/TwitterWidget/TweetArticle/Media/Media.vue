<template>
    <div class="media">
        <div v-bind:class="m.type" v-for="m in media" v-bind:key="m.id">
            <div v-if="m.type == 'video' || m.type == 'animated_gif'">
                <video  controls>
                    <source v-bind:src="m.video_url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div v-else-if="m.type == 'photo'">
                <img class="media-img" v-bind:src="m.media_url" v-bind:alt="m.type">
            </div>
        </div>
    </div>
</template>

<script src="./media.js"></script>
<style src="./media.css"></style>
