export default {
	namespaced: true,
	state: () => {
		return {
			list: JSON.parse(uni.getStorageSync('cart') || '[]')
		}
	},
	mutations: {
		addItem(state, goods) {
			const result = state.list.find((item) => item.id == goods.id);
			if (result) result.count++;
			else state.list.push(goods);
			this.commit('cart/save');
		},
		save(state) {
			uni.setStorageSync('cart', JSON.stringify(state.list));
		},
		changeGoodsState(state, goods) {
			let result = state.list.find((item) => item.id == goods.id);
			if (result) {
				result.state = goods.state;
				this.commit('cart/save');
			}
		},
		changeGoodsCount(state, goods) {
			console.log(goods)
			let result = state.list.find((item) => item.id == goods.id);
			if (result) {
				result.count = goods.count;
				this.commit('cart/save');
			}
		},
		removeGoods(state, id) {
			state.list = state.list.filter((item) => item.id !== id);
			this.commit('cart/save');
		},
		checkedCount(state) {
			return state.list.filter(item => item.state).reduce((total, item) => total += item.count, 0);
		},
		checkAllState(state, newState) {
			state.list.forEach(item => item.state = newState);
			this.commit('cart/save');
		},
	},
	getters: {
		total(state) {
			let count = 0;
			console.log(state.list);
			state.list.forEach((item) => {
				count += item.count;
			});
			return count;
		},
		amount(state) {
			return state.list.filter(item => item.state).reduce((total, item) => total += item.price * item.count, 0).toFixed(
				2);
		},
		goodsNum(state) {
			console.log('hh')
			return (goods) => {
				let result = state.list.find(item => item.id === goods.id);
				if (result) return result.count;
			}
		}
	}
}