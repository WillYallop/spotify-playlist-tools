export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Playlist Engine',
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
    { src: '~/plugins/filters' },
    { src: '~/plugins/vue-closable.js', ssr: false },
    { src: '~plugins/vue-draggable.js', ssr: false },
    { src: '~/plugins/vue-slider.js', ssr: false },
  ],
  components: true,
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode'
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
          icons: ['faTachometerAlt', 'faRandom', 'faRedo', 'faClone', 'faSearch', 'faEllipsisH', 'faCog', 'faBars', 'faHome','faUnlockAlt', 'faEye', 'faEyeSlash', 'faTrash', 'faTimes', 'faCheck', 'faEdit', 'faUsers', 'faMusic', 'faStopwatch', 'faSyncAlt', 'faCheckCircle', 'faEnvelope', 'faMoon', 'faSun']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faSpotify', 'faGoogle', 'faApple']
        }
      ]
    }],
  ],
  auth: {
    plugins: [
      '~/plugins/axios.js'
    ],
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
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
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
