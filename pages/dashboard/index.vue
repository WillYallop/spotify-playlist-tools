<template>
    <div>

        <!-- Usage Breakdown -->
        <UsageBreakdown/>

        <div class="appPageWrapper">
            <h1>Dashboard</h1>
            <nuxt-link to="/">Home</nuxt-link>
            <button v-on:click="test">Delete Tracks</button>
        </div>

    </div>
</template>

<script>
// Components
import UsageBreakdown from '@/components/global/app/UsageBreakdown'

export default {
    layout: 'app',
    data() {
        return {

        }
    },
    components: {
        UsageBreakdown
    },
    methods: {
        test2() {
            console.log(this.$auth)
        },
        test() {
            this.$axios.post(process.env.API_URL + '/tracks/delete', {
                
            })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>

</style>
