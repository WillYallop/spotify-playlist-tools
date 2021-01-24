<template>
    <div>
        <div class="navCon" :class="{ navActive : navStatus }">
            <Simplebar class="navWrapper" data-simplebar-auto-hide="true">
            
                    <div class="navTopSide">
                        <!-- User Info Section -->
                        <UserInfoSection/>
                        <!-- Navigation -->
                        <nav class="navLinksCon">
                            <nuxt-link @click.native="$store.commit('toggleNav')" class="navLink" to="/dashboard"><div class="iconCon"><fa class="fas" :icon="['fa', 'tachometer-alt']"/></div>Dashbaord</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleNav')" class="navLink" to="/dashboard/spotify/manager"><div class="iconCon"><fa class="fas" :icon="['fa', 'random']"/></div>Playlist Manager</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleNav')" class="navLink" to="/dashboard/spotify/tracker"><div class="iconCon"><fa class="fas" :icon="['fa', 'redo']"/></div>Track Playlist</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleNav')" class="navLink" to="/dashboard/spotify/schedule/tracks"><div class="iconCon"><fa class="fas" :icon="['fa', 'clone']"/></div>Schedule Tracks</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleNav')" class="navLink" to="/dashboard/spotify/schedule/playlists"><div class="iconCon"><fa class="fas" :icon="['fa', 'clone']"/></div>Schedule Playlists</nuxt-link>
                        </nav>
                    </div>
    
                    <!-- Footer --> 
                    <div class="navFootCon">
                        <button class="signOutBtn" v-on:click="$auth.logout(); $router.push('/sign-in')">Sign Out</button>
                        <p class="powererdByP">Powered By Melody Melon</p>
                        <p><nuxt-link to="/terms-service">Terms Service</nuxt-link> & <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></p>
                    </div>
        
            </Simplebar>
        </div>

        <div class="siteOverlay" :class="{ navActive : navStatus }" v-on:click="$store.commit('toggleNav')"></div>
    </div>
</template>

<script>
// Componenets
import Simplebar from 'simplebar-vue'
import UserInfoSection from '@/components/global/app/navigation/UserInfoSection'

export default {
    data() {
        return {

        }
    },
    components: {
        Simplebar,
        UserInfoSection
    },
    computed: {
        navStatus() {
            return this.$store.state.siteFunction.navStatus
        },
        selectedAccount() {
            return this.$store.state.accounts.selectedAccount
        },
    },
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
    transition: 0.2s;
    z-index: 1001;
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
    background-color: var(--background-1-hover);
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
    padding: 60px 20px 20px;
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

/* Site overlay */
.siteOverlay {
    display: none;
    position: fixed;
    top: 0;
    bottom: -56px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    transition: 0.2s;
    pointer-events: none;
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
    .navCon {left: -350px; border-radius: 0 20px 20px 0;}
    .navCon.navActive {left: 0;}
    .siteOverlay {display: flex; opacity: 0;}
    .siteOverlay.navActive {display: flex; opacity: 1; pointer-events: all;}
}
@media only screen and (max-width: 400px) {
    .navCon {width: calc(100% - 40px);}
}
</style>

<style>
.navWrapper .simplebar-content {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>