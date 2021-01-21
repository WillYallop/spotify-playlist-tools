<template>
  <div class="authBoxInner">
    <h2 class="authBoxHeading">Sign up to Playlist Engine</h2>
    <p class="authBoxSubheading">Don't have an account? <nuxt-link to="/sign-in">Sign In</nuxt-link></p>
    <div class="authOptionsCon">
      <button v-on:click="signInWithGoogle" class="googleSignInBtn"><img src="../../assets/images/googleIcon.png" alt="Sign Up with Google" class="iconImg">Sign Up With Google</button>
      <div class="seperatorCon">
        <div class="seperatorLine"></div>
        <div class="seperatorTextarea">
          <p class="orP">OR</p>
        </div>
      </div>
      <div class="authInputCon">
        <label for="fNameInp">First Name (*)</label>
        <input id="fNameInp" type="text" class="inputStyle" v-model="credentials.first_name" :class="{ 'inputNoData' : verifyFirstName === false }">
        <label for="lNameInp">Last Name (*)</label>
        <input id="lNameInp" type="text" class="inputStyle" v-model="credentials.last_name" :class="{ 'inputNoData' : verifyLastName === false }">
        <label for="emailInp">Email (*)</label>
        <input id="emailInp" type="text" class="inputStyle" v-model="credentials.email" :class="{ 'inputNoData' : verifyEmail === false }">

        <label for="passInp">Password (*)</label>
        <div class="inputWrapper">
          <input :type="passwordType" id="passInp" class="inputStyle" v-model="credentials.password" :class="{ 'inputNoData' : verifyPassword === false }">
          <div class="passInputIconCon" style="cursor: pointer;" v-on:click="showPassword">
            <fa v-if="passwordType === 'password'" class="fas" :icon="['fas', 'eye']"/>
            <fa v-else class="fas" :icon="['fas', 'eye-slash']"/>
          </div>
          <div class="passInputIconCon">
            <fa class="fas" :icon="['fas', 'unlock-alt']" :class="{ 'strongPas' : passwordStrength === 'strong', 'mediumPas' : passwordStrength === 'medium', 'weakPas' : passwordStrength === 'weak', 'noPas' : passwordStrength === false }"/>
          </div>
        </div> 

        <label for="passRepInp">Password Repeat (*)</label>
        <input id="passRepInp" :type="passwordType" class="inputStyle" v-model="credentials.password_repeat" :class="{ 'inputNoData' : verifyPassword === false }">
      </div>
      <button class="authActionBtn" v-on:click="signUp">Sign Up</button>
      <div class="errorCon" v-if="emptyFields.length > 0">
        <p :key="error" v-for="error in emptyFields">{{error}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// Libs
import axios from 'axios'

export default {
  layout: 'auth',
  data() {
    return {
      credentials: {
        first_name: '', 
        last_name: '', 
        email: '', 
        password: '', 
        password_repeat: ''

      },
      fieldsVerified: [false, false, false, false],
      emptyFields: [],
      passwordType: 'password',
      loadingSpinner: false
    }
  },
  computed: {
    // Verify
    verifyFirstName() {
      if(this.credentials.first_name.length > 0) {
        var regex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/
        if(regex.test(this.credentials.first_name)) {
            this.fieldsVerified[0] = true
            return true
        } else {
            this.fieldsVerified[0] = false
            return false
        }
      } else {
        this.fieldsVerified[0] = false
        return false
      }
    },
    verifyLastName() {
      if(this.credentials.last_name.length > 0) {
        var regex = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/
        if(regex.test(this.credentials.last_name)) {
          this.fieldsVerified[1] = true
          return true
        } else {
          this.fieldsVerified[1] = false
          return false
        }
      } else {
        this.fieldsVerified[1] = false
        return false
      }
    },
    verifyEmail() {
      if(this.credentials.email.length > 0) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if(regex.test(this.credentials.email)) {
          this.fieldsVerified[2] = true
          return true
        } else {
          this.fieldsVerified[2] = false
          return false
        }
      } else {
        this.fieldsVerified[2] = false
        return false
      }
    },
    verifyPassword() {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
      if(this.credentials.password === this.credentials.password_repeat) {
        if(this.credentials.password.length >= 4) {
          if(strongRegex.test(this.credentials.password)) {
            this.fieldsVerified[3] = true
            return 'strong'
          } else if (mediumRegex.test(this.credentials.password)) {
            this.fieldsVerified[3] = true
            return 'medium'
          } else {
            this.fieldsVerified[3] = false
            return 'weak'
          }
        } else {
          this.fieldsVerified[3] = false
          return false
        }
      } else {
        this.fieldsVerified[3] = false
        return false
      }
    },
    passwordStrength() {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
      if(this.credentials.password.length >= 4) {
        if(strongRegex.test(this.credentials.password)) {
          return 'strong'
        } else if (mediumRegex.test(this.credentials.password)) {
          return 'medium'
        } else {
          return 'weak'
        }
      } else {
        return false
      }
    },
  },
  methods: {
    signInWithGoogle() {
        this.$auth.loginWith('google')
      },
    verifyDataHandler() {
      let checker = arr => arr.every(Boolean);
      if(checker(this.fieldsVerified)) {
        return true
      } else {
        return false
      }  
    },
    signUp() {
      this.loadingSpinner = true
      this.emptyFields = []
      if(this.verifyDataHandler()) {
        // Sign up
        axios.post(process.env.API_URL + '/user/signup', this.credentials)
        .then((res) => {
          //Sign In
          this.$auth.loginWith('local', { 
            data: this.credentials
          })
          .then((response) => {
            this.$router.push('/dashboard')
          })
        })
        .catch((err) => {
          this.loadingSpinner = false
          if(err) {
            if(err.response.status === 409) {
              this.emptyFields.push(err.response.data.message)
            }
            if(err.response.status === 500) {
              this.emptyFields.push('There was an unknown error creating your account')
            }
          }
        })
      } else {
        this.loadingSpinner = false
        if(!this.fieldsVerified[0]) {
          this.emptyFields.push('Add a valid first name')
        }
        if(!this.fieldsVerified[1]) {
          this.emptyFields.push('Add a valid last name')
        }
        if(!this.fieldsVerified[2]) {
          this.emptyFields.push('Add a valid email')
        }
        if(!this.fieldsVerified[3]) {
          this.emptyFields.push('Add valid password')
        }
      }
    },
    //Password
    showPassword() {
      if(this.passwordType === 'text') {
        this.passwordType = 'password'
      } else if(this.passwordType === 'password') {
        this.passwordType = 'text'
      }
    },
  }
}
</script>

<style scoped>
.authBoxInner {
  width: 100%;
  max-width: 450px;
}
.authBoxHeading {
  font-size: 20px;
  color: var(--title-text);
  margin-bottom: 2px;
  text-align: center;
}
.authBoxSubheading {
  font-size: 14px;
  color: var(--body-text);
  text-align: center;
}
.authBoxSubheading a {
  color: var(--accent-1);
  font-weight: bold;
  text-decoration: none;
}

/* Auth Options */
.authOptionsCon {
  margin-top: 50px;
}
.googleSignInBtn {
  width: 100%;
  background-color: #F9F9FF;
  border: 1px solid var(--border);
  border-radius: 5px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: var(--title-text);
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.googleSignInBtn:hover {
  background-color: #F0F0F8;
}
.iconImg {
  height: 15px;
  width: 15px;
  margin-right: 10px;
}


/* Seperator */
.seperatorCon {
  margin: 20px 0;
  position: relative;
}
.seperatorLine {
  width: 100%;
  height: 1px;
  background-color: var(--background-1);
}
.seperatorTextarea {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.orP {
  background-color: var(--background-2);
  font-size: 14px;
  font-weight: bold;
  color: #B7C0CA;
  padding: 0 10px;
}
/* Auth inputs */
.authInputCon {
  width: 100%;
  margin-bottom: 20px
}
.authInputCon label {
  font-size: 14px;
  color: var(--non-focused-text);
}
.authInputCon .inputStyle {
  margin-top: 5px;
  margin-bottom: 10px;
}
.authInputCon .inputStyle:last-child {
  margin-bottom: 0;
}
.inputNoData:focus {
  border: 1px solid var(--error-text);
}

/* input overlay */
.inputWrapper {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.inputWrapper .inputStyle {
  width: calc(100% - 90px);
}
.passInputIconCon {
  margin-top: 5px;
  height: 40px;
  width: 40px;
  margin-left: 10px;
  background-color: #FDFDFD;
  border: 1px solid var(--background-1);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.passInputIconCon .fas {
  font-size: 14px;
  color: var(--title-text);
}
.passInputIconCon p {
  font-size: 12px;
}
.strongPas {color: #06D67B !important;} 
.mediumPas {color: #FD9D53 !important;} 
.weakPas {color: #FF2273 !important;} 
.noPas {color: #FF2273 !important;} 

/* Action Btn */
.authActionBtn {
  background-color: var(--accent-1);
  transition: 0.2s;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  height: 40px;
}
.authActionBtn:hover {
  background-color: var(--accent-1-hover);
}

.errorCon {
  background-color: var(--error-text);
  color: #FFF;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 14px;
}
</style>
