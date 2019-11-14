
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '码上汇后台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_1481803_n9uvjy7ixui.css', type: 'text/css'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/index.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/axios', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: '/',
    proxy: process.NODE_ENV != 'production' && process.NODE_ENV != 'prev',
    withCredentials: true,
    prefix: '/v1/admin', // 表示给请求url加个前缀 /api
  },
  proxy: {
    '/v1/admin': {
      target: 'http://127.0.0.1:3009', // 代理地址
      changeOrigin: true
    }
  },
  // router: {
  //   base: "/answer/"
  // },
  /*
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    *
    *
    *
    */
    extend (config, ctx) {
    }
  }
}
