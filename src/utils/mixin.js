export default {
    mounted() {
        this.$nextTick(() => {
            const images = document.getElementsByTagName('img')
            for (let i = 0; i < images.length; i++) {
                images[i].addEventListener('error', this.handleImageError)
            }
        })
    },
    methods: {
        handleImageError(event) {
            event.target.src = require('@/assets/images/default.png')
        },
    },
}