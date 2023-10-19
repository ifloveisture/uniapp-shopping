<template>
	<view class="goods" @click="handleClick(goods)">
		<view class="left">
			<image :src="goods.goods_small_logo || defaultPic" class="pic"></image>
		</view>
		<view class="right">
			<view class="name">{{ goods.goods_name }}</view>
			<view class="info">
				<view class="price">￥{{ goods.goods_price | toFixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2);
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			handleClick(item) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.left {
			margin-right: 5px;

			.pic {
				display: block;
				width: 100px;
				height: 100px;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name {
				font-size: 13px;
			}

			.price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>