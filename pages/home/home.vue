<template>
	<view>
		<view class="search-box">
			<my-search @click="handleClick()"></my-search>
		</view>
		<swiper indicator-dots indicator-color="rgba(255,255,255,.3)" indicator-active-color="#d81e06" autoplay
			interval="3000" circular>
			<swiper-item v-for="(item) in swiperList" :key="item.goods_id">
				<view class="img-box" @click="handleSwiper(item.goods_id)">
					<image :src="item.image_src" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="handleNav(item.name)">
				<image :src="item.image_src" mode="widthFix"></image>
			</view>
		</view>
		<view class="floor-list">
			<view v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" mode="widthFix"></image>
				<view class="floor-content">
					<view class="left" @click="handleFloorNav(item.product_list[0].navigator_url)">
						<image :src="item.product_list[0].image_src" mode="widthFix"></image>
					</view>
					<view class="right">
						<view v-for="(floor_item,j) in item.product_list" :key="j" v-if="j !== 0" class="right-content"
							@click="handleFloorNav(floor_item.navigator_url)">
							<image :src="floor_item.image_src" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		methods: {
			async getSwiperList() {
				let result = await uni.$http.get('/api/public/v1/home/swiperdata');
				if (result.statusCode !== 200) {
					uni.$meaasge({
						msg: '数据请求失败',
						time: 1500,
						icon: 'none'
					});
				} else {
					this.swiperList = result.data.message;
				}
			},
			handleSwiper(id) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${id}`
				});
			},
			async getNavList() {
				let result = await uni.$http.get('/api/public/v1/home/catitems');
				if (result.statusCode !== 200) {
					uni.$meaasge({
						msg: '数据请求失败',
						time: 1500,
						icon: 'none'
					});
				} else {
					this.navList = result.data.message;
				}
			},
			handleNav(name) {
				if (name === '分类') uni.switchTab({
					url: '/pages/cate/cate'
				});
			},
			async getFloorList() {
				let result = await uni.$http.get('/api/public/v1/home/floordata');
				if (result.statusCode !== 200) {
					uni.$meaasge({
						msg: '数据请求失败',
						time: 1500,
						icon: 'none'
					});
				} else {
					this.floorList = result.data.message;
				}
			},
			handleFloorNav(url) {
				let query = url.split('?')[1];
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?${query}`
				});
			},
			handleClick() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
		},
		mounted() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 340rpx;
	}

	image {
		width: 100%;
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 12rpx 0;
	}

	.nav-item {
		width: 120rpx;

		image {
			max-width: 100%;
		}
	}

	.floor-content {
		display: flex;
		justify-content: space-around;

		.left {
			width: 230rpx;

			image {
				max-width: 100%;
			}
		}

		.right {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 400rpx;

			.right-content {
				width: 180rpx;
				height: 180rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>