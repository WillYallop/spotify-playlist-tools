<template>
    <div class="accountsCon"> 

        <div class="accountRow" :key="account._id" v-for="account in accounts">
            <div class="leftSideCon">
                <img :src="account.image" class="accountImg">
                <div class="accountTextarea">
                    <p class="accountNameP">{{account.displayName}}</p>
                    <p class="accountFollowersP"><span class="boldify">{{account.followers}}</span> followers</p>
                </div>
            </div>
            <div class="rightSideCon">
                <div class="accountTypeIconCon">
                    <fa v-if="account.accountType === 'spotify'" class="fas spoityIcon" :icon="['fab', 'spotify']"/>
                </div>
                <button class="removeAccountBtn"><fa class="fas" :icon="['fa', 'trash']"/></button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('getAccounts');
    },
    computed: {
        accounts() {
            return this.$store.state.accounts.accounts
        }
    }

}
</script>

<style scoped>
.accountsCon {
    width: 100%;
}
.accountRow {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid var(--background-1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
}
.accountRow:last-child {
    margin-bottom: 0;
}
.leftSideCon {
    display: flex;
    align-items: center;
}
.accountImg {
    height: 40px;
    width: 40px;
    min-width: 40px;
    object-fit: cover;
    border-radius: 5px;
}
.accountTextarea {
    padding-left: 5px;
}
.accountNameP {
    font-size: 14px;
    font-weight: bold;
    color: var(--title-text);
}
.accountFollowersP {
    font-size: 14px;
    color: var(--body-text);
}
.rightSideCon {
    display: flex;
    align-items: center;
}
.accountTypeIconCon {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.accountTypeIconCon .fas {
    font-size: 20px;
}
.spoityIcon {color: #1DB954;}
.appleIcon {color: #fc3c44;}
.removeAccountBtn {
    height: 30px;
    width: 30px;
    min-width: 30px;
    background-color: var(--background-1);
    transition: 0.2s;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.removeAccountBtn:hover {
    background-color: var(--background-1-hover);
}
.removeAccountBtn .fas {
    font-size: 10px;
    color: var(--title-text);
    transition: 0.2s;
}
.removeAccountBtn:hover .fas {
    color: var(--error-text);
}
</style>