<template>
    <div class="defaultNav">
        <div class="navCon" :class="{ navActive : frontendNavStatus }">
            <Simplebar class="navWrapper" data-simplebar-auto-hide="true">
            
                    <div class="navTopSide">
                        <!-- User Info Section -->
                        <FrontendUserInfoSection/>
                        <!-- Navigation -->
                        <nav class="navLinksCon">
                            <nuxt-link @click.native="$store.commit('toggleFrontendNav')" class="navLink" to="/"><div class="iconCon"><fa class="fas" :icon="['fa', 'tachometer-alt']"/></div>Home</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleFrontendNav')" class="navLink" to="/spotify/shuffle"><div class="iconCon"><fa class="fas" :icon="['fa', 'random']"/></div>Shuffle Playlist</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleFrontendNav')" class="navLink" to="/spotify/generate"><div class="iconCon"><fa class="fas" :icon="['fa', 'redo']"/></div>Generate Playlists</nuxt-link>
                            <nuxt-link @click.native="$store.commit('toggleFrontendNav')" class="navLink" to="/spotify/remove-duplicates"><div class="iconCon"><fa class="fas" :icon="['fa', 'clone']"/></div>Remove Duplicates</nuxt-link>
                        </nav>
                    </div>
    
                    <!-- Footer --> 
                    <div class="navFootCon">
                        <p class="powererdByP">Powered By Melody Melon</p>
                        <p><nuxt-link to="/terms-service">Terms Service</nuxt-link> & <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></p>
                        <div class="footerAuthLinks">
                            <button v-on:click="navigateAuthLink('/sign-in')" class="signInLink" to="/sign-in">Sign In</button>
                            <button  v-on:click="navigateAuthLink('/sign-up')" class="signUpLink" to="/sign-up">Sign Up</button>
                        </div>
                    </div>
        
            </Simplebar>
        </div>

        <div class="siteOverlay" :class="{ navActive : frontendNavStatus }" v-on:click="$store.commit('toggleFrontendNav')"></div>
    </div>
</template>

<script>
// Componenets
import Simplebar from 'simplebar-vue'
import FrontendUserInfoSection from '@/components/global/frontend/navigation/FrontendUserInfoSection'

export default {
    data() {
        return {

        }
    },
    components: {
        Simplebar,
        FrontendUserInfoSection
    },
    computed: {
        frontendNavStatus() {
            return this.$store.state.siteFunction.frontendNavStatus
        }
    },
    methods: {
        navigateAuthLink(href) {
            this.$store.commit('toggleFrontendNav')
            setTimeout(() => {
                this.$router.push(href)
            },200)
        }
    }
}
</script>

<style scoped>
.defaultNav {
    display: none;
}
.navCon {
    position: fixed;
    top: 0;
    left: -350px;
    bottom: 0;
    width: 350px;
    background-color: var(--background-2);
    border-radius: 0 0 20px 0;
    border-right: 1px solid var(--border);
    transition: 0.2s;
    z-index: 1001;
}
.navCon.navActive {left: 0;}
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

/* Footer auth links */
.footerAuthLinks {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
} 
.signInLink {
    width: calc(50% - 5px);
    padding: 8px 20px;
    display: block;
    background-color: transparent;
    border: 2px solid var(--accent-1);
    color: var(--accent-1);
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    text-decoration: none;
    transition: 0.2s;
} 
.signInLink:hover {
    background-color: var(--accent-1-hover);
    border: 2px solid var(--accent-1-hover);
    color: #FFF;
}
.signUpLink {
    width: calc(50% - 5px);
    padding: 8px 20px;
    display: block;
    background-color: var(--accent-1);
    border: 2px solid var(--accent-1);
    color: #FFF;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    text-decoration: none;
    transition: 0.2s;
}
.signUpLink:hover {
    background-color: var(--accent-1-hover);
    border: 2px solid var(--accent-1-hover);
}

/* Site overlay */
.siteOverlay {
    display: flex;
    position: fixed;
    top: 0;
    bottom: -56px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    transition: 0.2s;
    pointer-events: none;
    opacity: 0;
}
.siteOverlay.navActive {opacity: 1; pointer-events: all;}

/* Media Queries */
@media only screen and (max-width: 1024px) {
    .defaultNav {display: block;}
}
@media only screen and (max-width: 400px) {
    .navCon {width: calc(100% - 40px);}
}
</style>

<style>
.simplebar-content {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>