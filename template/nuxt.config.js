module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '{{ name }}',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'keywords', content: '{{ name }}'},
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /**
   * css
   */
  css: ['~/styles/site.css'],
  /**
   * plugins
   */
  plugins: [
    // Server-side noly
    '~/plugins/service',
    // Client-side only
    {src: '~/plugins/client', ssr: false}
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt'
  ],
  axios: {
    prefix: process.env.NODE_ENV !== 'production' ? '/dev' : '/api',
    proxy: true
  },
  proxy: {
    '/dev': {target: 'http(s)://API_URL_DEV', pathRewrite: {'^/dev/': ''}},
    '/api': {target: 'http(s)://API_URL_PRO', pathRewrite: {'^/api/': ''}}
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
