<template>
	<view>
		<view class="goods-list">
			<block v-for="(goods,index) in goodsList" :key="index">
				<my-goods :goods="goods"></my-goods>
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
			if(this.query.pagenum * this.query.pagesize >= this.total) return uni.$message('数据加载完毕');
			if(this.isLoading) return;

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
				if (res.meta.status !== 200) return uni.$message('数据请求失败');
				this.goodsList = [...this.goodsList, ...res.message.goods];
				this.total = res.message.total;
				console.log(this.goodsList);
			}
		}
	}
</script>

<style lang="scss">
	
</style>