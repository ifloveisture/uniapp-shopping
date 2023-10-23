
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'
import install from 'uni_modules/uni-view/index.js'
import store from 'store/index.js';

Vue.config.productionTip = false

$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function (options) {
	uni.showLoading({
		title: '数据加载中...'
	})
}
$http.afterRequest = function () {
	uni.hideLoading()
}
uni.$http = $http
uni.$message = function (title) {
	uni.showToast({
		title,
		duration: 5000,
		icon: null
	});
}

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif