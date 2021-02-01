<template>
    <div class="bannerCon"> 

        <div class="bannerTextarea">
            <h1 class="bannerTitleP">Take your playlists to the next level!</h1>
            <p class="bannerSubtitleP">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim. Laoreet vestibulum neque quis, dignissim.</p>
       
            <div class="buttonCon">
                <nuxt-link class="bannerBtn" to="/sign-up">Sign Up</nuxt-link>
                <nuxt-link class="bannerBtn altBannerBtn" to="/playlist/duplicates">Playlist Tools</nuxt-link>
            </div>
        </div>

        <img src="../../../assets/images/frontend/indexBannerImg.png" alt="Playlist Engine" class="bannerImg">

    </div>
</template>

<style scoped>
.bannerCon {
    width: 100%;
    background-color: var(--background-4);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 0;
    position: relative;
    margin-bottom: 40px;
}
.bannerTextarea {
    text-align: center;
    max-width: 600px;
    padding: 100px 0;
} 
.bannerTitleP {
    font-size: clamp(40px, 7vw, 50px);
} 
.bannerSubtitleP {
    font-size: 18px;
    margin-top: 10px;
}
.buttonCon {
    display: flex;
    justify-content: center;
    margin-top: 20px;
} 
.bannerBtn {
    display: block;
    padding: 10px 40px;
    background-color: var(--accent-1);
    border-radius: 10px;
    color: #FFF;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.2s;
    border: 2px solid var(--accent-1);
}
.bannerBtn:first-child {
    margin-right: 10px;
}
.altBannerBtn {
    background-color: var(--background-4);
    color: var(--accent-1);
}
.bannerBtn:hover {
    background-color: var(--accent-1-hover);
    border: 2px solid var(--accent-1-hover);
    color: #FFF;
}

.bannerImg {
    max-width: 900px;
    width: 100%;
    object-fit: scale-down;
    margin-bottom: -40px;
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.03));
}
</style>