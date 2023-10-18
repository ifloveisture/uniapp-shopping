<template>
	<view>
		<view class="search-box">
			<u-search :focus="true" @change="input" height="80" bg-color="#c00000" placeholder="日照香炉生紫烟" v-model="searchValue"
				@custom="handleSearch"></u-search>
		</view>
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="i" @click="getDetail(item.goods_id)">
				<view class="goods-name">{{ item.goods_name }}</view>
				<icon></icon>
			</view>
		</view>
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<u-icon @click="handleClear" name="trash" size="40"></u-icon>
			</view>
			<view class="history-list">
				<u-tag @longpress.native="handlePress(item)" :closeable="item.closable" @close="handleClose(item)"
					@click="handleSearch(item)" v-for="(item,index) in historyList" :text="item.label" :key="item.label"
					type="success" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				timer: null,
				searchResults: [],
				historyList: [{
						label: 'a',
						closable: false
					},
					{
						label: '电',
						closable: false
					}
				]
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('history') || '[]');
		},
		methods: {
			input() {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.getSearchList();
				}, 500);
			},
			async getSearchList() {
				if (this.searchValue === '') {
					this.searchResults = [];
					return;
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.searchValue
				});
				if (res.meta.status !== 200) return uni.$showMsg();
				this.searchResults = res.message;
			},
			getDetail(goods_id) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`
				})
			},
			handleSearch(item) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?searchVal=${item.label}`
				}).then(() => {
					this.saveHistory(item);
					this.searchValue = '';
				});
			},
			saveHistory(item) {
				let index = this.historyList.indexOf(item);
				if (index >= 0) {
					let arr = this.historyList.splice(index, 1);
					this.historyList = arr.concat(this.historyList);
				} else {
					this.historyList.unshift({
						label: this.searchValue,
						closable: false
					});
				}
				uni.setStorageSync('history', JSON.stringify(this.historyList));
			},
			handleClear() {
				this.historyList = [];
				uni.setStorageSync('history', JSON.stringify(this.historyList));
			},
			handleClose(item) {
				let index = this.historyList.indexOf(item);
				this.historyList.splice(index, 1);
				uni.setStorageSync('history', JSON.stringify(this.historyList));
			},
			handlePress(item) {
				item.closable = true;
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			.u-tag {
				margin: 5px 5px 0 0;
			}
		}
	}
</style>