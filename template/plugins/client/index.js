import Vue from 'vue'

// event-bus
import EventBus from '@/utils/event-bus'
{{#plugins}}
// sweetalert
import SweetAlert from 'sweetalert'

// webuploader
import WebUploader from 'webuploader'

// vee-validate
import VeeValidate, { Validator } from 'vee-validate'
import VeeCN from 'vee-validate/dist/locale/zh_CN'

// use
Validator.localize(VeeCN)

Vue.use(VeeValidate, {
  locale: VeeCN.name,
  dictionary: {
    zh_CN: {
      messages: {
        required: field => `${field}不能为空`,
        confirmed: (field, target) => `${field}和${target}不匹配`
      }
    }
  }
})

Vue.webUploader = Vue.prototype.$webUploader = WebUploader
Vue.sweetAlert = Vue.prototype.$sweetAlert = SweetAlert
{{/plugins}}
Vue.eventBus = Vue.prototype.$eventBus = EventBus
