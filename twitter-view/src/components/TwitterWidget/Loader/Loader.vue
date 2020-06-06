<template>
    <div class="container loader" v-if="active_loading">
        <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loader",
        props: ['active_loading'],
    }
</script>
