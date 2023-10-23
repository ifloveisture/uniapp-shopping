<template>
	<view>
		<my-search @click="handleClick()"></my-search>
		<view class="scroll-container">
			<scroll-view :style="{height: `${wh}px`}" class="cate-one" scroll-y>
				<view v-for="(item,index) in cateList" :key="item.cat_id" :data-active="index === activeLevel[0]"
					@click="handleSelect(index,0)" class="scroll-item">
					{{ item.cat_name }}
				</view>
			</scroll-view>
			<scroll-view :style="{height: `${wh}px`}" class="cate-two" scroll-y>
				<block v-for="(item) in cateList[activeLevel[0]].children" :key="item.cat_id">
					<view class="level-two-cate">{{ item.cat_name }}</view>
					<!-- <u-waterfall v-model="item.children">
						<template v-slot:left="{leftList}">
							<view v-for="(it, index) in leftList" :key="index">
								<view class="img-box">
									<image :src="it.cat_icon" mode="widthFix"></image>
								</view>
								<view>{{ it.cat_name }}</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view v-for="(it, index) in rightList" :key="index">
								<view class="img-box">
									<image :src="it.cat_icon" mode="widthFix"></image>
								</view>
								<view>{{ it.cat_name }}</view>
							</view>
						</template>
					</u-waterfall> -->
					<view class="goods-list">
						<view v-for="(it) in item.children" :key="it.cat_id" class="goods">
							<view class="img-box">
								<image :src="it.cat_icon" mode="widthFix"></image>
							</view>
							<view>{{ it.cat_name }}</view>
						</view>
					</view>
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
				activeLevel: [0, 0]
			};
		},
		methods: {
			async getCateList() {
				let result = await uni.$http.get('/api/public/v1/categories');
				if (result.statusCode !== 200) {
					uni.$meaasge({
						msg: '数据请求失败',
						time: 1500,
						icon: 'none'
					});
				} else {
					this.cateList = result.data.message;
				}
			},
			async getDeviceHeight() {
				let info = await uni.getSystemInfoAsync();
				this.wh = info[1].windowHeight - 50;
			},
			handleSelect(index, level) {
				if (level === 0) {
					this.activeLevel.splice(level, 2, index, 0);
				} else if (level === 1) {
					this.activeLevel.splice(level, 1, index);
				}
			},
			handleClick() {
				uni.navigateTo({
					url: '/subpkg/search/search'
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
			
			.goods-list {
				display: flex;
				flex-wrap: wrap;
			}

			.goods {
				border: 1px solid #122;
				width: 300rpx;
				box-sizing: border-box;
				padding: 12rpx;
				background-color: #fff;
				margin: 10rpx;

				.img-box {
					width: 94%;
				}

				image {
					max-width: 100%;
				}
			}
		}
	}
</style>