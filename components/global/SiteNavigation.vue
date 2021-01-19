<template>
    <div class="navCon">
        <Simplebar class="navWrapper" data-simplebar-auto-hide="true">
         
                <div class="navTopSide">
                    <!-- User Info Section -->
                    <UserInfoSection/>
                    <!-- Navigation -->
                    <nav class="navLinksCon">
                        <nuxt-link class="navLink" to="/dashboard"><div class="iconCon"><fa class="fas" :icon="['fa', 'tachometer-alt']"/></div>Dashbaord</nuxt-link>
                        <nuxt-link class="navLink" to="/playlist/shuffle"><div class="iconCon"><fa class="fas" :icon="['fa', 'random']"/></div>Shuffle Playlist</nuxt-link>
                        <nuxt-link class="navLink" to="/playlist/generate"><div class="iconCon"><fa class="fas" :icon="['fa', 'redo']"/></div>Generate Playlists</nuxt-link>
                        <nuxt-link class="navLink" to="/playlist/duplicates"><div class="iconCon"><fa class="fas" :icon="['fa', 'clone']"/></div>Remove Duplicates</nuxt-link>
                    </nav>
                </div>
 
                <!-- Footer --> 
                <div class="navFootCon">
                    <p class="powererdByP">Powered By Melody Melon</p>
                    <p><nuxt-link to="/terms-service">Terms Service</nuxt-link> & <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></p>
                </div>
       
        </Simplebar>
    </div>
</template>

<script>
// Componenets
import Simplebar from 'simplebar-vue'
import UserInfoSection from '@/components/global/navigation/UserInfoSection'

export default {
    data() {
        return {

        }
    },
    components: {
        Simplebar,
        UserInfoSection
    }
}
</script>

<style scoped>
.navCon {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 350px;
    background-color: var(--background-2);
    border-radius: 0 0 20px 0;
    border-right: 1px solid var(--border);
}
.navWrapper {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
.navTopSide {
    width: 100%;
}


/* Navigation Links */
.navLinksCon {
    width: 100%;
    padding: 0 20px;
}
.navLink {
    display: flex;
    align-items: center;
    background-color: var(--background-1);
    height: 40px;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 0 20px;
    color: var(--non-focused-text);
    text-decoration: none;
    transition: 0.2s;
    font-size: 14px;
    font-weight: bold;
}
.navLink:last-child {
    margin-bottom: 0;
}
.navLink:hover {
    background-color: #E6EBF1;
}
.navLink.nuxt-link-exact-active {
    background-color: var(--accent-1);
    color: #FFF;
}
.iconCon {
    width: 20px;
    margin-right: 5px;
}
.iconCon .fas {
    color: var(--non-focused-text);
    transition: 0.2s;
}
.navLink.nuxt-link-exact-active .iconCon .fas {
    color: #FFF;
}

/* Footer */
.navFootCon {
    width: 100%;
    align-self: flex-end;
    padding: 0 20px;
    margin: 20px 0;
}
.powererdByP {
    font-size: 14px;
    margin-bottom: 2px;
    color: var(--non-focused-text);
}
.navFootCon p {
    font-size: 14px;
    color: var(--non-focused-text);
}
.navFootCon p a {
    font-weight: bold;
    color: var(--accent-1);
    text-decoration: none;
}
.navFootCon p a:hover {
    text-decoration: underline;
}
</style>

<style>
.simplebar-content {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>