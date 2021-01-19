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
                <img src="../assets/images/logo.png" class="authSiteLogo">
                <nuxt-link to="/" class="authHomeLink"><fa class="fas" :icon="['fa', 'home']"/></nuxt-link>
            </div>
            <!-- Auth Box -->
            <div class="authBoxCon">
              <Nuxt/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.authLayoutCon {
  display: flex;
}
/* Col 1 */
.authCol1 {
  min-height: 100vh;
  width: 670px;
  margin-right: -20px;
  background-color: var(--accent-1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 40px;
}
.authInfoCon {
  width: 100%;
  max-width: 500px;
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
  min-height: 100vh;
  width: calc(100% - 650px);
  background-color: var(--background-2);
  position: relative;
  border-radius: 20px 0 0 20px;
}
/* Header */
.authHeaderCon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
} 
.authSiteLogo {
  width: 210px;
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
  padding: 100px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Media Querie */
@media only screen and (max-width: 1300px) {
  .authLayoutCon {flex-wrap: wrap;}
  .authCol1 {width: 100%; min-height: auto; display: none;}
  .authCol2 {width: 100%;}
  .authBoxCon {padding: 100px 20px;}
}
</style>
