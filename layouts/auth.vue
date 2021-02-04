<template>
  <div class="authLayoutCon">
    <div class="authCol1">
      <div class="authInfoCon">
        <h2 class="authInfoConTitle">Mange Your Playlists Like a professional</h2>
        <p class="authInfoConP">We have a multitude of features to help you manage your playlists from one place. Track progress, generate, re-order and tidy your playlists today!</p>
        <img class="authInfoConImg" src="../assets/images/authImg.png" alt="Playlist Tool">
      </div>
    </div>
    <div class="authCol2">
      <!-- Header -->
      <div class="authHeaderCon">
        <nuxt-link to="/" class="authSiteLogo"><img src="../assets/images/logo.png" class="authSiteLogo"></nuxt-link>
        <nuxt-link to="/" class="authHomeLink"><fa class="fas" :icon="['fa', 'home']"/></nuxt-link>
      </div>
      <!-- Auth Box -->
      <div class="authBoxCon">
        <Nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest-only',
}
</script>

<style scoped>
.authLayoutCon {
  display: flex;
  background-color: var(--accent-1);
  padding: 20px;
}
/* Col 1 */
.authCol1 {
  min-height: calc(100vh - 40px);
  width: 650px;
  background-color: var(--accent-1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 40px;
}
.authInfoCon {
  width: 100%;
  max-width: 450px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
} 
.authInfoConTitle {
  max-width: 300px;
  margin-bottom: 20px;
  color: #FFF;
  font-size: 24px;
} 
.authInfoConP {
  margin-bottom: 40px;
  color: #E7E7E7;
  font-size: 16px;
}
.authInfoConImg {
  max-width: 340px;
  width: 80%;
}


/* col 2 */
.authCol2 {
  min-height: calc(100vh - 40px);
  width: calc(100% - 650px);
  background-color: var(--background-2);
  position: relative;
  border-radius: 20px;
}
/* Header */
.authHeaderCon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px 0;
} 
.authSiteLogo {
  height: 35px;
  width: 132px;
}
.authHomeLink {
  background-color: var(--background-1);
  color: var(--title-text);
  padding: 5px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
}
.authHomeLink:hover {
  background-color: var(--background-1-hover);
}
/* Auth Box */
.authBoxCon {
  height: 100%;
  padding: 120px 40px 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Media Querie */
@media only screen and (max-width: 1300px) {
  .authLayoutCon {flex-wrap: wrap; padding: 0;}
  .authCol1 {width: 100%; min-height: auto; display: none;}
  .authCol2 {width: 100%; border-radius: 0;}
  .authBoxCon {padding: 100px 20px;}
  .authHeaderCon  {padding: 0 20px; height: 60px;}
}
</style>
