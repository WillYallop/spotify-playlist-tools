<template>
    <div class="appPageCon">

        <!-- Usage Breakdown -->
        <UsageBreakdown/>

        <div class="appPageWrapper">
            
            <h1>Dashboard</h1>
            <nuxt-link to="/">Home</nuxt-link>
            {{$auth.user}}
            {{$auth.loggedIn}}
            <button v-on:click="test">Test token</button>
        </div>
    </div>
</template>

<script>
// Libs
import axios from 'axios'

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
            let config = {
                headers: {
                    'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                    'Authorization': this.$auth.strategy.token.get()
                }
            }
            axios.post(process.env.API_URL + '/user/test', {
                
            }, config)
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
