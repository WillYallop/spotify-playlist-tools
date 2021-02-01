<template>
  <div>
    <FrontendHeader/>
    <FrontendNavigation/>
    <Nuxt/>
  </div>
</template>

<script>
// Componenets
import FrontendHeader from '@/components/global/frontend/FrontendHeader'
import FrontendNavigation from '@/components/global/frontend/FrontendNavigation'

export default {
  data() {
    return {

    }
  },
  components: {
    FrontendHeader,
    FrontendNavigation
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

html {
  -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  -webkit-tap-highlight-color: transparent !important;
  height: 100%;
}
body {
  margin: 0;
  font-family: 'Montserrat', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  min-height: 100%;
  height: 100%;
  background-color: #F9FBFD;
}

textarea {font-family: 'Montserrat', sans-serif !important;}
button {font-family: 'Montserrat', sans-serif !important;}
button:focus {outline: none;}
input:focus {outline: none; border: 1px solid var(--accent-1);}
input {font-family: 'Montserrat', sans-serif !important;} 
textarea:focus {outline: none;}
select:focus {outline: none;}
select {-webkit-appearance: none;}
::selection {background-color: #3C50E0; color: #FFF;}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* Variables */
:root {
  --background-1: #EAEFF5;
  --background-1-hover: #E6EBF1;
  --background-2: #FFF;
  --background-3: #0A0E27;
  --background-3-hover: #050817;
  --background-4: #E8F1FF;

  --border: #DCE6F1;

  --accent-1: #3C50E0;
  --accent-1-hover: #3749CD;

  --accent-2: #20BF55;
  --accent-2-hover: #1DA84B;

  --title-text: #393C41;
  --body-text: #606368;
  --non-focused-text: #8C8C8C;
  --error-text: #E94151;
  --error-text-hover: #DF3D4C;
}

/* Page */
.pageCon {
  padding-top: 60px;
  width: 100%;
}
.pageWrapper {
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}

.inputStyle {
  width: 100%;
  height: 40px;
  background-color: #FDFDFD;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  color: var(--body-text);
  border: 1px solid var(--background-1);
  -webkit-appearance: none;
}
.inputStyle::placeholder {
  color: var(--body-text);
}
.errorMsg {
  color: var(--error-text);
  font-size: 14px;
  margin-top: 5px;
}

.boldify {
  font-weight: bold;
  color: var(--title-text);
}
</style>
