<template>
  <div class="headerCon" :class="{ 'scrolled' : scrolled > 50 }">
    <div class="headerWrapper pageWrapper">
      <div class="leftSide">
        <nuxt-link class="siteLogo" to="/"><img src="../../../assets/images/logo.png" class="siteLogo"></nuxt-link>
      </div>
      <div class="rightSide">
        <nav class="desktopNav">
          <nuxt-link class="headerLink" to="/playlist/shuffle">Shuffle Playlist</nuxt-link>
          <nuxt-link class="headerLink" to="/playlist/generate">Generate Playlist</nuxt-link>
          <nuxt-link class="headerLink" to="/playlist/duplicates">Remove Duplicates</nuxt-link>

          <nuxt-link to="/sign-in" class="signInLink">Sign In</nuxt-link>
          <nuxt-link to="/sign-up" class="signUpLink">Sign Up</nuxt-link>
        </nav>

        <div class="mobileBtns">
          <button v-on:click="$store.commit('toggleFrontendNav')" class="navigationBtn"><fa class="fas" :icon="['fa', 'bars']"/></button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrolled: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.listenToScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.listenToScroll)
  },
  computed: {

  },
  methods: {
    listenToScroll() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop        
      this.scrolled = winScroll
    },

  }
}
</script>

<style scoped>
.headerCon {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  transition: 0.2s;
}
.headerCon.scrolled {
  height: 60px;
  background-color: #FFF;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
}
.headerWrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.leftSide {
  display: flex;
  align-items: center;
}
.siteLogo {
  height: 35px;
  width: 132px;
}

/* Right Side */
.rightSide {
  display: flex;
  align-items: center;
} 
.desktopNav {
  display: flex;
  align-items: center;
}
.headerLink {
  margin-right: 20px;
  font-size: 14px;
  font-weight: bold;
  color: var(--title-text);
  text-decoration: none;
} 

.signInLink {
  padding: 8px 30px;
  display: block;
  background-color: transparent;
  border: 2px solid var(--accent-1);
  color: var(--accent-1);
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  margin-right: 10px;
  margin-left: 20px;
  transition: 0.2s;
} 
.signInLink:hover {
  background-color: var(--accent-1-hover);
  border: 2px solid var(--accent-1-hover);
  color: #FFF;
}
.signUpLink {
  padding: 8px 30px;
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

/* Mobile btn */
.mobileBtns {
  display: none;
}
.navigationBtn {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: var(--background-1);
  border: none;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navigationBtn .fas {
  color: var(--title-text);
  font-size: 16px;
}
.navigationBtn:hover {
  background-color: var(--background-1-hover);
}

/* Media Queries */
@media only screen and (max-width: 1024px) {
  .desktopNav {display: none;}
  .mobileBtns {display: flex;}
}
</style>
