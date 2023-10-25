<template>
	<view>
		<my-search @click="handleClick()"></my-search>
		<view class="scroll-container">
			<scroll-view :style="{height: `${wh}px`}" class="cate-one" scroll-y>
				<view v-for="(item,index) in cateList" :key="item.cat_id" :data-active="index === activeIndex"
					@click="handleSelect(index)" class="scroll-item">
					{{ item.cat_name }}
				</view>
			</scroll-view>
			<scroll-view :style="{height: `${wh}px`}" class="cate-two" scroll-y :scroll-top="scrollTop">
				<block v-for="(item) in cateList[activeIndex].children" :key="item.cat_id">
					<view class="level-two-cate">{{ item.cat_name }}</view>
					<u-waterfall v-model="item.children">
						<template v-slot:left="{leftList}">
							<view class="goods" v-for="(it) in leftList" :key="it.cat_id" @click="handleClickCate(it)">
								<view class="img-box">
									<image :src="it.cat_icon" mode="widthFix"></image>
								</view>
								<view>{{ it.cat_name }}</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="goods" v-for="(it) in rightList" :key="it.cat_id" @click="handleClickCate(it)">
								<view class="img-box">
									<image :src="it.cat_icon" mode="widthFix"></image>
								</view>
								<view>{{ it.cat_name }}</view>
							</view>
						</template>
					</u-waterfall>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/badge.js';

	export default {
		mixins: [badgeMix],
		data() {
			return {
				cateList: [],
				wh: 0,
				activeIndex: 0,
				scrollTop: 0
			};
		},
		methods: {
			async getCateList() {
				let result = await uni.$http.get('/api/public/v1/categories');
				if (result.statusCode !== 200) {
					uni.$error('数据请求失败');
				} else {
					this.cateList = result.data.message;
				}
			},
			async getDeviceHeight() {
				let info = await uni.getSystemInfoAsync();
				this.wh = info[1].windowHeight - 50;
			},
			handleSelect(index) {
				this.activeIndex = index;
				this.scrollTop = this.scrollTop ? 0 : 1;
			},
			handleClick() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			handleClickCate(item) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?cid=${item.cat_id}`
				})
			}
		},
		mounted() {
			this.getCateList();
			this.getDeviceHeight();
		}
	}
</script>

<style lang="scss">
	[data-active="true"] {
		color: red;
		box-sizing: border-box;
		background-color: darkblue !important;
		border-right: 4px solid #364;
		padding-right: 16rpx;
	}

	.scroll-container {
		display: flex;

		.cate-one {
			width: 108rpx;
			flex-shrink: 0;

			.scroll-item {
				padding: 10rpx 16rpx;
				padding-right: 20rpx;
				background-color: antiquewhite;
			}
		}

		.cate-two {
			.level-two-cate {
				padding: 10rpx 16rpx;
				background-color: #882255;
			}

			.img-box {
				width: 94%;
			}

			image {
				max-width: 100%;
			}

			.goods {
				display: flex;
				flex-direction: column;
				align-items: center;
				border: 1px solid #122;
				width: 300rpx;
				box-sizing: border-box;
				padding: 12rpx;
				background-color: #fff;
				margin: 10rpx;
			}
			
			.u-waterfall {
				// display: flex;
			}
		}
	}
</style>