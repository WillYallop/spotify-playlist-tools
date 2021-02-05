<template>
    <div>
        <SecondaryBanner
        :title="'Remove Duplicate Playlist Tracks'"
        :body="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis aliquam neque. Pellentesque tellus justo, laoreet vestibulum neque quis, dignissim.'"/>
        <InfoRow/>

        <div class="pageWrapper">
            
            <!-- No Spotify Account -->
            <div class="signIntoSpotifyCon">
                <fa class="fas" :icon="['fab', 'spotify']"/>
                <p class="addAccount">Log In With Spotify</p>
            </div>


        </div>
        <FrontendFooter/>
    </div>
</template>

<script>
import SecondaryBanner from '@/components/global/frontend/SecondaryBanner'
import InfoRow from '@/components/frontend/removeDuplicates/InfoRow'
import FrontendFooter from '@/components/global/frontend/FrontendFooter'

export default {
    colorMode: 'light',
    middleware: 'guest-only',
    data() {
        return {

        }
    },
    components: {
        SecondaryBanner,
        InfoRow,
        FrontendFooter
    }
}
</script>

<style scoped>
.pageWrapper {
    padding-top: 0;
    padding-bottom: 0;
}

/* No Account */
.signIntoSpotifyCon {
    width: 100%;
    height: 400px;
    background-color: var(--accent-2);
    margin-top: -20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 0.2s;
    cursor: pointer;
}
.signIntoSpotifyCon:hover {
    background-color: var(--accent-2-hover);
}
.signIntoSpotifyCon .fas {
    color: #FFF;
    font-size: 30px;
}
.addAccount {
    color: #FFF;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}
</style>
