export default {
    name: "NoFoundMessage",
    props: ['active_message'],
    data() {
        return {
            no_results_img_path: require('@/assets/image/no-result.png'),
        };
    },
}