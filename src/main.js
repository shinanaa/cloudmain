// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './permission'
import Element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import VeLine from 'v-charts/lib/line.common'
import 'common/stylus/index.styl'
import myHttp from 'common/js/request'
Vue.prototype.$http = myHttp

Vue.component(VeLine.name, VeLine)
Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
