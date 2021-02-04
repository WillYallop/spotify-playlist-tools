<template>
    <div class="settingsSectComp">
        <div class="sectTitleCon">
            <p class="sectTitleConP">User Info</p>
        </div>
        <ul class="infoUl">
            <li><span class="boldify">First Name:</span> {{user.firstName}}</li>
            <li><span class="boldify">Last Name:</span> {{user.lastName}}</li>
        </ul>
        <div class="sectTitleCon">
            <p class="sectTitleConP">Account Info</p>
        </div>
        <ul class="infoUl">
            <li><span class="boldify">Joined:</span> {{ user.created | formatDate }}</li>
            <li><span class="boldify">Membership:</span> {{user.accountType}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user.user
        },
    }
}
</script>

<style scoped>
.settingsSectComp {
    width: 100%;
}
.sectTitleCon {
    background-color: var(--background-1);
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 5px;
}
.sectTitleConP {
    font-size: 14px;
    font-weight: bold;
    color: var(--title-text);
}
.infoUl {
    padding: 0;
    width: 100%;
    margin-bottom: 5px;
}
.infoUl:last-child {
    margin-bottom: 0;
}
.infoUl li {
    width: 100%;
    border-bottom: 1px solid var(--background-1);
    margin-bottom: 5px;
    list-style-type: none;
    font-size: 14px;
    color: var(--body-text);
}
.infoUl li:last-child {
    border-bottom: none;
    margin-bottom: 0;
}
</style>