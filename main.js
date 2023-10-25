// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {
	$http
} from '@escook/request-miniprogram'
import uview from 'uni_modules/uni-view/index.js'
import store from 'store/index.js';

Vue.config.productionTip = false
uview.install(Vue);

$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	});

	if (options.url.indexOf('/mine/') !== -1) {
		options.header = {
			Authorization: store.state.user.token,
		}
	}
}
$http.afterRequest = function() {
	uni.hideLoading()
}
uni.$http = $http
uni.$message = function(title) {
	uni.showToast({
		title,
		duration: 5000,
		icon: 'none'
	});
}
uni.$success = function(title) {
	uni.showToast({
		title,
		duration: 5000,
		icon: 'success'
	});
}
uni.$error = function(title) {
	uni.showToast({
		title,
		duration: 5000,
		icon: 'error'
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
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif