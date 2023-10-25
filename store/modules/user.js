export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		redirectInfo: null
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address;
			this.commit('user/save');
    },
		updateUserInfo(state,info) {
			state.userInfo = info;
			this.commit('user/save');
		},
		updateToken(state,token) {
			state.token = token;
			this.commit('user/save');
		},
		  updateRedirectInfo(state, info) {
		    state.redirectInfo = info
		  },
		save(state) {
			uni.setStorageSync('address', JSON.stringify(state.address));
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo));
			uni.setStorageSync('token',state.token);
		}
  },
  getters: {
		addstr(state) {
			if(!state.address.provinceName) return '';
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
		}
	},
}