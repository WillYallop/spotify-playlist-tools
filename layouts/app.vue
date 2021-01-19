<template>
  <div>
    <AppHeader/>
    <SiteNavigation/>
    <Nuxt/>
  </div>
</template>

<script>
// Componenets
import AppHeader from '@/components/global/AppHeader'
import SiteNavigation from '@/components/global/SiteNavigation'

export default {
    data() {
        return {

        }
    },
    components: {
        AppHeader,
        SiteNavigation
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
  background-color: var(--background-1);
}

textarea {font-family: 'Montserrat', sans-serif !important;}
button {font-family: 'Montserrat', sans-serif !important;}
button:focus {outline: none;}
input:focus {outline: none;}
.inputStyle {-webkit-appearance: none;}
input {font-family: 'Montserrat', sans-serif !important;} 
textarea:focus {outline: none;}
select:focus {outline: none;}
select {-webkit-appearance: none;}
::selection {background-color: #1B7DF1; color: #FFF;}

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

  --border: #DCE6F1;

  --accent-1: #1B7DF1;
  --accent-1-hover: #1770DA;

  --title-text: #393C41;
  --body-text: #606368;
  --non-focused-text: #8C8C8C;
  --error-text: #E94151;

}

/* Page */
.pageCon {
  padding-left: 350px;
  width: 100%;
}
.pageWrapper {
  padding: 20px;
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
}
.inputStyle::placeholder {
  color: var(--body-text);
}

.errorMsg {
  color: var(--error-text);
  font-size: 14px;
  margin-top: 5px;
}
</style>
