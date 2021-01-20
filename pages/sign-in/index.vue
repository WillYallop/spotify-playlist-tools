<template>
    <div class="authBoxInner">
        <h2 class="authBoxHeading">Sign in to Playlist Tools</h2>
        <p class="authBoxSubheading">Don't have an account? <nuxt-link to="/sign-up">Sign Up</nuxt-link></p>
        <div class="authOptionsCon">
            <button v-on:click="signInWithGoogle" class="googleSignInBtn"><img src="../../assets/images/googleIcon.png" alt="Sign In with Google" class="iconImg">Sign In With Google</button>
            <div class="seperatorCon">
                <div class="seperatorLine"></div>
                <div class="seperatorTextarea">
                    <p class="orP">OR</p>
                </div>
            </div>
            <div class="authInputCon">
                <label for="emailInp">Email</label>
                <input id="emailInp" type="text" class="inputStyle" autocomplete="email" v-on:keyup.enter="signIn" v-model="credentials.email">
                <label for="passInp">Password</label>
                <input id="passInp" type="password" class="inputStyle" autocomplete="current-password" v-on:keyup.enter="signIn" v-model="credentials.password">
            </div>
            <button class="authActionBtn" aria-label="Sign In" v-on:click="signIn">Sign In</button>
            <p class="forgotPasswordP">forgot password</p>

            <div class="errorCon" v-if="errorMsg">
                <p>{{errorMsg}}</p>
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
                email: '',
                password: ''
            },
            errorMsg: false
        }
    },
    mounted() {
        if(this.$router.currentRoute.query.googleauth === 'true') {
            this.$auth.fetchUser()
            .then((response) => {
                let config = {
                    headers: {
                        'Auth-Strategy': this.$auth.strategy.name === 'google' ? 'google' : 'local',
                        'Authorization': this.$auth.strategy.token.get()
                    }
                }
                axios.post(process.env.API_URL + '/user/signin/google', {
                    googleId: this.$auth.user.sub,
                    email: this.$auth.user.email,
                    firstName: this.$auth.user.given_name,
                    lastName: this.$auth.user.family_name
                }, config)
                .then((response) => {
                    this.$router.push('/dashboard')
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        }
    },
    methods: {
        signInWithGoogle() {
            this.$auth.loginWith('google')
        },
        signIn() {
            this.errorMsg = false
            try {
                this.$auth.loginWith('local', { 
                    data: this.credentials 
                })
                .then(() => {
                    this.$router.push('/dashboard')
                })
                .catch((err) => {
                    if(err.response.status == 401) {
                        this.errorMsg = 'Sign in attempt failed!'
                    }
                    if(err.response.status == 429) {
                        this.errorMsg = 'Too many requests! Please try again later.'
                    }
                    if(err.response.status == 500) {
                        this.errorMsg = 'Sign in attempt failed!'
                    }
                })
            } catch(err) {
                console.log(err)
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

.forgotPasswordP {
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    color: var(--non-focused-text);
    cursor: pointer;
}
.forgotPasswordP:hover {
    text-decoration: underline;
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
    text-align: center;
    color: var(--error-text);
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}
</style>
