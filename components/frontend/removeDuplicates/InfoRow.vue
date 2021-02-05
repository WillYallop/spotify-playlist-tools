<template>
    <div class="infoRowCon">
        <ul class="infoRowWrapper pageWrapper">

            <li class="infoCol" style="padding: 0 20px 0 0;">
                <p class="infoColTitleP"><span class="infoColIcon"></span>Full Control</p>
                <p class="infoColBodyP">Have full control over what Spotify playlists you want to remove duplicate tracks from.</p>
            </li>
            <li class="infoCol" style="padding: 0 10px 0 10px;">
                <p class="infoColTitleP"><span class="infoColIcon"></span>Secure</p>
                <p class="infoColBodyP">This service only removes duplicate tracks, so rest assured you playlist wont get ruined.</p>
            </li>
            <li class="infoCol" style="padding: 0 0 0 20px;">
                <p class="infoColTitleP"><span class="infoColIcon"></span>One of Many</p>
                <p class="infoColBodyP">This isn't the only free tool at Playlist Engine! Re-order you Spotify playlists with this tool.</p>
            </li>

        </ul>
    </div>
</template>

<style scoped>
.infoRowCon {
    background-color: #D4E3FB;
}
.infoRowWrapper {
    display: flex;
    list-style-type: none;
    padding-bottom: 40px;
}
.infoCol {
    width: 33.33%;
} 
.infoColTitleP {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
} 
.infoColIcon {
    display: block;
    height: 20px;
    width: 20px;
    background-color: var(--accent-1);
    margin-right: 5px;
    border-radius: 50%;
}
.infoColBodyP {
    font-size: 16px;
    margin-top: 5px;
}

/* Media Queries */
@media only screen and (max-width: 900px) {
    .infoRowWrapper {
        flex-wrap: wrap;
        width: 100%;
    }
    .infoCol {
        width: 100%;
        padding: 10px !important;
        margin-top: 10px;
        background-color: var(--background-4);
        border-radius: 10px;
    }
    .infoCol:first-child {margin-top: 0 !important;}
}
</style>