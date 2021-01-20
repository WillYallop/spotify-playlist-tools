export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'spotify-playlist-tools',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'simplebar/dist/simplebar.min.css',
  ],
  plugins: [
    
  ],
  components: true,
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faTachometerAlt', 'faRandom', 'faRedo', 'faClone', 'faSearch', 'faEllipsisH', 'faCog', 'faBars', 'faHome','faUnlockAlt', 'faEye', 'faEyeSlash']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faSpotify', 'faGoogle']
        }
      ]
    }],
  ],
  auth: {
    redirect: {
      login: '/sign-in',
      callback: '/sign-in?googleauth=true',
      home: false
    },
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: 'data',
        },
        endpoints: {
          login: { url: '/user/signin', method: 'post' },
          user: { url: '/user', method: 'get', headers: { 'Auth-Strategy': 'local' } },
          logout: false
        }
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        codeChallengeMethod: ''
      },
    }
  },
  axios: {
    baseURL: 'https://playlist-tools-api.herokuapp.com/v1'

  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
  },

}
