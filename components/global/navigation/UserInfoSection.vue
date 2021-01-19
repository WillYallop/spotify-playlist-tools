<template>
    <div class="userInfoCon"> 
        <div class="userInfoHeader">
            <img src="https://i.scdn.co/image/ab6775700000ee85de9c14422e2d1ed55c87b509" class="currentAccountPP">
            <div class="switchAccountController">
                <div class="altAccountsCon">
                    <button class="altAccountImg"><img src="https://i.scdn.co/image/ab6775700000ee8579237c6b8df7daa5b251190c"></button>
                </div>
                <button class="switchAccountBtn"><fa class="fas" :icon="['fa', 'ellipsis-h']"/></button>
            </div>
        </div>
        <div class="userInfoTextarea">
            <p class="spotifyUsername">William Yallop</p>
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
/* Swap Account */
.switchAccountController {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
}
.altAccountsCon {
    display: flex;
}
.altAccountImg {
    height: 30px;
    width: 30px;
    padding: 0;
    border-radius: 50%;
    border: none;
    margin-right: 5px;
    cursor: pointer;
} 
.altAccountImg img {
    height: 30px;
    width: 30px;
    object-fit: cover;
}
.switchAccountBtn {
    height: 30px;
    width: 30px;
    border: 1px solid var(--accent-1);
    background-color: var(--background-2);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.switchAccountBtn .fas {
    color: var(--accent-1);
    transition: 0.2s;
}
.switchAccountBtn:hover {
    background-color: var(--accent-1);
}
.switchAccountBtn:hover .fas {
    color: #FFF;
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
}
</style>