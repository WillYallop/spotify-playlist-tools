<template>
  <div class="headerCon">
    <div class="headerWrapper appPageWrapper">
      <div class="leftSide">
        <nuxt-link v-if="$colorMode.value != 'dark'" class="siteLogo" to="/dashboard"><img src="../../../assets/images/logo.png" class="siteLogo"></nuxt-link>
        <nuxt-link v-else class="siteLogo" to="/dashboard"><img src="../../../assets/images/logoWhite.png" class="siteLogo"></nuxt-link>
      </div>
      <div class="rightSide">
        <button class="darkModeBtn" v-on:click="toggleDarkMode"><fa v-if="$colorMode.value === 'light'" class="fas" :icon="['fa', 'moon']"/><fa v-else class="fas" :icon="['fa', 'sun']"/></button>
        <button class="settingsBtn" v-on:click="$router.push('/settings')"><fa class="fas" :icon="['fa', 'cog']"/></button>
        <button class="settingsBtn navToggleBtn" v-on:click="$store.commit('toggleNav')"><fa class="fas" :icon="['fa', 'bars']"/></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    navStatus() {
      return this.$store.state.siteFunction.navStatus
    }
  },
  methods: {
    toggleDarkMode() {
      if(this.$colorMode.value === 'light') {
        this.$colorMode.value = 'dark'
      } else if(this.$colorMode.value === 'dark') {
        this.$colorMode.value = 'light'
      }
    }
  }
}
</script>

<style scoped>
.headerCon {
  position: fixed;
  top: 0;
  left: 350px;
  right: 0;
  height: 60px;
  background-color: var(--background-2);
  border-bottom: 1px solid var(--border);
  transition: left 0.2s;
  z-index: 1000;
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

.rightSide {
  display: flex;
}
.settingsBtn {
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
.settingsBtn .fas {
  color: var(--title-text);
  font-size: 16px;
}
.settingsBtn:hover {
  background-color: var(--background-1-hover);
}
.navToggleBtn {
  display: none;
}

.darkModeBtn {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #121416;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
}
.darkModeBtn:hover {
  background-color: #1B1E21;
}
.darkModeBtn .fas {
  color: #FFF;
  font-size: 16px;
}
.dark-mode .darkModeBtn {
  background-color: #FFF;
}
.dark-mode .darkModeBtn:hover {
  background-color: #EBE4E4;
}
.dark-mode .darkModeBtn .fas {
  color: #FF8317;
}


/* Media Queries */
@media only screen and (max-width: 1024px) {
  .headerCon {left: 0;}
  .navToggleBtn {display: flex;}
}
</style>
