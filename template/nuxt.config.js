export default {
  mode: 'universal',
  server: {
    // host: '0.0.0.0', // 默认 localhost
    port: {{serverPort}} // 默认 3000
  },

  /*
   ** Headers of the page
   */
  head: {
    title: '{{ name }}',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }, { name: 'keywords', content: '{{ name }}' }, { hid: 'description', name: 'description', content: '{{escape description }}' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]{{#if_neq baiduStatistics ""}},
    script: [{ src: `https://hm.baidu.com/hm.js?${process.env.NODE_ENV === 'production' ? '' : '{{baiduStatistics}}'}` }]
    {{/if_neq}}

  },

  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },

  /**
   * css
   */
  css: ['~/styles/site.scss'],

  /**
   * plugins
   */
  plugins: [
    // Server-side noly
    '~/plugins/service',
    // Client-side only
    { src: '~/plugins/client', mode: 'client' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: process.env.NODE_ENV !== 'production' ? '/dev' : '/api',
    proxy: true
  },
  proxy: {
    '/dev': { target: 'http(s)://API_URL_DEV', pathRewrite: { '^/dev/': '' } },
    '/api': { target: 'http(s)://API_URL_PRO', pathRewrite: { '^/api/': '' } }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
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
