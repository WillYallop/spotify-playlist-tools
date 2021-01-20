<template>
    <div class="userInfoCon"> 
        <div class="userInfoHeader">
            <img src="https://i.scdn.co/image/ab6775700000ee85de9c14422e2d1ed55c87b509" class="currentAccountPP">
        </div>
        <div class="userInfoTextarea">
            <p class="spotifyUsername">William Yallop</p>
            <p class="spotifyInfoP"><span style="font-weight:bold;">5</span> Actions Remaining</p>
            <div class="spotifyInfoPCon">
                <p class="spotifyInfoP"><span style="font-weight:bold;">0</span> Followers</p>
                <p class="spotifyInfoP"><span style="font-weight:bold;">0</span> Playlists</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.userInfoCon {
    width: 100%;
    padding: 20px;
}
/* Header */
.userInfoHeader {
    width: 100%;
    position: relative;
} 
.currentAccountPP {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    min-width: 50px;
}

/* Info Area */
.userInfoTextarea {
    width: 100%;
    margin-top: 5px;
} 
.spotifyUsername {
    font-size: 14px;
    font-weight: bold;
}
.spotifyInfoPCon {
    display: flex;
} 
.spotifyInfoP {
    font-size: 14px;
    margin-right: 10px;
    margin-top: 2px;
}
</style>