<template>
    <div class="playManHead">
        <div class="playManHeadWrapper">
            <div class="playManTextarea">
                <h1 class="playManTitle">Manage Your Playlist</h1>
                <p class="playManSubtitleP">Select a playlist you would like to manage!</p>
            </div>
            <div class="breadcrumbCon">
                <p><nuxt-link to="/dashboard">Dashboard</nuxt-link><span class="breadcrumbSpacer">»</span><nuxt-link to="/dashboard/spotify/manager">Manager</nuxt-link></p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.playManHead {
    border-radius: 0 0 20px 20px;
    background-color: #D7DFE8;
    width: calc(100% + 610px);
    position: relative;
    z-index: 0;
}
.playManHeadWrapper {
    padding: 20px 630px 40px 20px;
}
.playManTextarea {
    width: 100%;
    margin-bottom: 20px;
}
.playManTitle {
    font-size: 18px;
    color: var(--title-text);
    margin-bottom: 2px;
}
.playManSubtitleP {
    color: var(--body-text);
    font-size: 16px;
}
.breadcrumbCon {
    background-color: var(--background-1);
    border-radius: 5px;
    padding: 5px;
}
.breadcrumbCon p {
    font-size: 14px;
}
.breadcrumbCon p a {
    text-decoration: none;
    color: var(--body-text);
}
.breadcrumbCon p a:hover {
    color: var(--accent-1);
}
.breadcrumbSpacer {
    margin: 0 5px;
    color: var(--title-text);
    font-weight: bold;
}
</style>