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
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['faTachometerAlt', 'faRandom', 'faRedo', 'faClone', 'faSearch', 'faEllipsisH', 'faCog']
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['faSpotify']
        }
      ]
    }],
  ],
  axios: {

  },
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
  }
}
