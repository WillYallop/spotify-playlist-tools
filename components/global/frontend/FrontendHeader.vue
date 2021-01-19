<template>
  <div class="headerCon">
    <div class="headerWrapper pageWrapper">
      <div class="leftSide">
        <img src="../../../assets/images/logo.png" class="siteLogo">
      </div>
      <div class="rightSide">
        <nuxt-link class="headerLink" to="/">Home</nuxt-link>
        <nuxt-link class="headerLink" to="/playlist/shuffle">Shuffle Playlist</nuxt-link>
        <nuxt-link class="headerLink" to="/playlist/generate">Generate Playlist</nuxt-link>
        <nuxt-link class="headerLink" to="/playlist/duplicates">Remove Duplicates</nuxt-link>

        <nuxt-link to="/sign-in" class="signInLink">Sign In</nuxt-link>
        <nuxt-link to="/sign-up" class="signUpLink">Sign Up</nuxt-link>
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

  },
}
</script>

<style scoped>
.headerCon {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
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
  width: 210px;
}

/* Right Side */
.rightSide {
  display: flex;
  align-items: center;
} 
.headerLink {
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
  color: var(--title-text);
  text-decoration: none;
} 

.signInLink {
  padding: 8px 40px;
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
} 
.signUpLink {
  padding: 8px 40px;
  display: block;
  background-color: var(--accent-1);
  border: 2px solid var(--accent-1);
  color: #FFF;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
}

</style>
