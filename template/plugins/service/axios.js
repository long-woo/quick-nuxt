// https://axios.nuxtjs.org/
import ApiFactory from '@/api'

export default function ({ $axios, redirect }, inject) {
  const api = ApiFactory($axios)

  /**
   * 注入api入口
   * 在组件里面调用 this.$api....
   */
  inject('api', api)

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {
    console.log(response)
    return response.data
  })

  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status)
    // if (code === 400) {
    //   redirect('/error')
    // }
    const res = error.response || {}
    const data = res.data || {}
    const code = data.code || 404
    const message = data.message || data.desc || '请求出错啦^o^'

    return {code, message}
  })
}
