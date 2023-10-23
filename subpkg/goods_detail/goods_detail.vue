<template>
	<view v-if="info.goods_name" class="goods-detail">
		<swiper indicator-dots autoplay :interval="3000" :duration="1000 " circular>
			<swiper-item v-for="(item,index) in info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="info">
			<view class="price">￥{{ info.goods_price }}</view>
			<view class="body">
				<view class="name">{{ info.goods_name }}</view>
				<view class="favi" @click="handleCollect">
					<u-icon v-if="isStared" name="star-fill"></u-icon>
					<u-icon v-else name="star"></u-icon>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">快递: 免运费</view>
		</view>
		<rich-text :nodes="info.goods_introduce"></rich-text>
		<uni-goods-nav class="goods_nav" :fill="true" :options="options" :buttonGroup="btnGroup" @click="onClick"
			@buttonClick="buttonClick" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapState('cart', ['list']),
			...mapGetters('cart', ['total']),
		},
		watch: {
			total: {
				handler(newVal) {
					let result = this.options.find(item => item.text == '购物车');
					if (result) result.info = newVal;
				},
				immediate: true
			},
		},
		data() {
			return {
				info: {},
				isStared: false,
				options: [{
						icon: 'shop',
						text: '店铺'
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 2
					}
				],
				btnGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const gid = options.goods_id;
			this.getGoodsDetail(gid);
		},
		methods: {
			...mapMutations('cart', ['addItem']),
			async getGoodsDetail(gid) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: gid
				});
				if (res.meta.status !== 200) return uni.$message('数据请求失败');
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
					.replace(/webp/g, 'jpg');
				this.info = res.message;
			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.info.pics.map(item => item.pics_big)
				})
			},
			handleCollect() {
				this.isStared = !this.isStared;
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					});
				}
			},
			buttonClick(e) {
				if (e.content.text == '加入购物车') {
					const goods = {
						id: this.info.goods_id,
						name: this.info.goods_name,
						price: this.info.goods_price,
						count: 1,
						small_logo: this.info.goods_small_logo,
						state: true
					}
					this.addItem(goods);
				}
			},
		}
	}
</script>

<style lang="scss">
	.goods-detail {
		padding-bottom: 50px;
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.info {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.body {
			display: flex;
			justify-content: space-between;

			.name {
				font-size: 13px;
				padding-right: 10px;
			}

			.favi {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 120px;
				font-size: 12px;
				border-left: 1px solid #efefef;
			}
		}

		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}
</style>