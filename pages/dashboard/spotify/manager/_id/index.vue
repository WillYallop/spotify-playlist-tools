<template>
    <div>
        g
    </div>
</template>

<script>
export default {
    layout: 'app',
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.$router.currentRoute.params.id)
    },
    methods: {

    }
}
</script>

<style scoped>

</style>