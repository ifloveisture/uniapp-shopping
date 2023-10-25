<template>
	<view>
		<view class="goods-list">
			<block v-for="(goods,index) in goodsList" :key="index">
				<my-goods @click-goods="handleClickGoods()" :goods="goods"></my-goods>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query: {
					keywords: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			this.query.keywords = options.query || '';
			this.query.cid = options.cid || '';
			this.getGoodsList();
		},
		onReachBottom() {
			if (this.query.pagenum * this.query.pagesize >= this.total) return uni.$success('数据加载完毕');
			if (this.isLoading) return;

			this.query.pagenum++;
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.query.pagenum = 1;
			this.total = 0;
			this.isLoading = false;
			this.goodsList = [];
			this.getGoodsList(() => uni.stopPullDownRefresh());
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true;
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.query);
				this.isLoading = false;
				cb && cb();
				if (res.meta.status !== 200) return uni.$error('数据请求失败');
				let list = this.handleData(res.message.goods);
				this.goodsList = [...this.goodsList, ...list];
				this.total = res.message.total;
			},
			handleData(oldList = []) {
				let newList = [];
				oldList.forEach((item) => {
					let obj = {
						id: item.goods_id,
						name: item.goods_name,
						price: item.goods_price,
						small_logo: item.goods_small_logo
					};
					newList.push(obj);
				});
				return newList;
			},
			handleClickGoods(e) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${e.id}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>