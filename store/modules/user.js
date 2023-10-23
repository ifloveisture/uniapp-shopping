export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address;
			this.commit('user/save');
    },
		save(state) {
			uni.setStorageSync('address', JSON.stringify(state.address));
		}
  },
  getters: {
		addstr(state) {
			if(!state.address.provinceName) return '';
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo;
		}
	},
}