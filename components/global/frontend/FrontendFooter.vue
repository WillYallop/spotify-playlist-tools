<template>
    <footer class="footerCon">
        <div class="footerWrapper pageWrapper">

            <div class="footerInfoCol">
                <img src="../../../assets/images/logoWhite.png" alt="Playlist Engine" class="logoImg">
                <p class="infoColP">©Copyright {{ currentYear }} by PLAYLIST ENGINE</p>
                <p class="infoCol"><nuxt-link to="/terms-of-service">Terms of Service</nuxt-link> | <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link></p>
            </div>

            <div class="footerLinksCol">
                <div class="linkCol">
                    <p class="linkColHeaderP">Pages</p>
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/">Shuffle Playlist</nuxt-link>
                    <nuxt-link to="/spotify/remove-duplicates">Remove Duplicates</nuxt-link>
                </div>
                <div class="linkCol">
                    <p class="linkColHeaderP">Useful Links</p>
                    <nuxt-link to="/">Contact</nuxt-link>
                    <nuxt-link to="/">Sign In</nuxt-link>
                    <nuxt-link to="/">Sign Up</nuxt-link>
                </div>
                <div class="linkCol">
                    <p class="linkColHeaderP">Socials</p>
                    <a href="">Instagram</a>
                    <a href="">Facebook</a>
                    <a href="">Twitter</a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            currentYear: ''
        }
    },
    mounted() {
        this.currentYear = new Date().getFullYear()
    }
}
</script>

<style scoped>
.footerCon {
    margin-top: 150px;
    width: 100%;
    background-color: var(--background-3);
}
.footerWrapper {
    width: 100%;
    border-radius: 10px;
    padding-top: 40px;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-between;
}   
.footerInfoCol {
    min-width: 300px;
} 
.logoImg {
    height: 35px;
    margin-bottom: 20px;
} 
.infoColP {
    color: #FFF;
    margin-bottom: 5px;
    font-size: 14px;
} 
.infoCol {
    color: #FFF;
    font-size: 14px;
} 
.infoCol a {
    color: #FFF;
    text-decoration: none;
    transition: 0.2s;
}
.infoCol a:hover {
    color: var(--accent-1);
}

/* Links */
.footerLinksCol {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 900px;
}
.linkCol {
    font-size: 14px;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    width: 33.33%;
} 
.linkColHeaderP {
    font-weight: bold;
    color: #FFF;
    margin-bottom: 5px;
}
.linkCol a {
    color: #FFF;
    text-decoration: none;
    padding: 5px 0;
    transition: 0.2s;
    border-bottom: 1px solid #262A47;
}
.linkCol a:hover {
    color: var(--accent-1);
}

/* Media Queries */
@media only screen and (max-width: 768px) {
    .footerWrapper {flex-wrap: wrap;}
    .footerInfoCol {min-width: 100%;}
    .footerLinksCol {justify-content: flex-start; margin-top: 20px; background-color: var(--background-3-hover); padding: 20px; border-radius: 10px;}
    .linkCol:first-child {padding-left: 0;}
    .linkCol a {border-bottom: 1px solid var(--background-3);}
}
@media only screen and (max-width: 500px) {
    .footerLinksCol {flex-wrap: wrap;}
    .linkCol {width: 100%;padding-left: 0; margin-top: 20px;}
    .linkCol:first-child {margin-top: 0;}
}
</style>