<template>
  <div class="headerCon">
    <div class="headerWrapper">
      <div class="leftSide">
        <img src="../../assets/images/logo.png" class="siteLogo">
      </div>
      <div class="rightSide">
        <button class="settingsBtn"><fa class="fas" :icon="['fa', 'cog']"/></button>
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
.siteLogo {
  width: 210px;
}
.settingsBtn {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: var(--background-1);
  border: none;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 5px;
}
.settingsBtn .fas {
  color: var(--title-text);
}
.settingsBtn:hover {
  background-color: var(--background-1-hover);
}
.navToggleBtn {
  display: none;
}


/* Media Queries */
@media only screen and (max-width: 1024px) {
  .headerCon {left: 0;}
  .navToggleBtn {display: inline;}
}
</style>
