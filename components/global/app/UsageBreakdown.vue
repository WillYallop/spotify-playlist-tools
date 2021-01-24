<template>
    <div class="breakdownCon">
        <div class="breakdownTextarea">
            <h1 class="breakdownTitle">Welcome {{user.firstName}} {{user.lastName}}</h1>
            <p class="breakdownSubtitleP">Here's your usage breakdown! (resets <span class="boldify">{{ firstOfMonth() | formatDate }}</span>)</p>
        </div>
        <div class="usageCon">
            <div class="usageCol topUsageCol">
                <p class="usageP"><span class="boldify">{{actionHandler.actions}}</span></p>
                <p class="usageP">ACTIONS</p>
            </div>
            <div class="usageCol topUsageCol">
                <p class="usageP">MONITOR</p>
                <p class="usageP"><span class="boldify">{{actionHandler.monitorPlaylists}}</span> PLAYLISTS</p>
            </div>
            <div class="usageCol">
                <p class="usageP">SCHEDULE</p>
                <p class="usageP"><span class="boldify">{{actionHandler.scheduleTracks}}</span> TRACKS</p>
            </div>
            <div class="usageCol">
                <p class="usageP">SCHEDULE</p>
                <p class="usageP"><span class="boldify">{{actionHandler.schedulePlaylists}}</span> PLAYLISTS</p>
            </div>
        </div>

        <button class="accountTypeBtn">{{user.accountType}} Account</button>
    </div>
</template>

<script>
export default {
    layout: 'app',
    data() {
        return {

        }
    },
    computed: {
        user() {
            return this.$store.state.user.user
        },
        actionHandler() {
            return this.$store.state.actionHandler
        }
    },
    methods: {
        firstOfMonth() {
            var date = new Date()
            date.setMonth(date.getMonth()+1, 1)
            return date
        }
    }
}
</script>

<style scoped>
.breakdownCon {
    border-radius: 0 0 20px 20px;
    background-color: #D7DFE8;
    padding: 20px 20px 40px;
    position: relative;
    z-index: 0;
}
.breakdownTextarea {
    width: 100%;
    margin-bottom: 20px;
}
.breakdownTitle {
    font-size: 18px;
    color: var(--title-text);
    margin-bottom: 2px;
}
.breakdownSubtitleP {
    color: var(--body-text);
    font-size: 16px;
}
.usageCon {
    width: 100%;
    display: flex;
}
.usageCol {
    padding: 20px;
    background-color: var(--background-1);
    border-radius: 10px;
    margin-right: 10px;
}
.usageCol:last-child {
    margin-right: 0;
}
.usageP {
    font-size: 16px;
}

/* Account Type Btn */
.accountTypeBtn {
    background-color: var(--accent-2);
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    color: #FFF;
    font-weight: bold;
    text-transform: capitalize;
    position: absolute;
    top: 20px;
    right: 20px;
    transition: 0.2s;
    cursor: pointer;
}
.accountTypeBtn:hover {
    background-color: var(--accent-2-hover);
}

/* Media Queries */
@media only screen and (max-width: 600px) {
    .usageCon {justify-content: space-between; flex-wrap: wrap;}
    .usageCol {width: calc(50% - 5px);margin-right: 0; padding: 10px;}
    .topUsageCol {margin-bottom: 10px;}
}
</style>
