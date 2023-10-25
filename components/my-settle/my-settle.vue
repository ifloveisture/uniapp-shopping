<template>
	<view class="settle">
		<label class="radio" @click="handleCheckState">
			<radio color="#c00000" :checked="isFullCheck"></radio>
			<text>全选</text>
		</label>
		<view class="amount">
			合计:<text>￥{{ amount }}</text>
		</view>
		<view class="btn" @click="handleSettle">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
	import {
		map
	} from 'core-js/fn/dict';
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'

	export default {
		name: "my-settle",
		computed: {
			...mapGetters('cart', ['checkedCount', 'total', 'amount', 'list']),
			...mapGetters('user', ['addstr']),
			...mapState('user', ['token']),
			isFullCheck() {
				return this.total === this.checkedCount;
			},
		},
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		methods: {
			...mapMutations('cart', ['checkAllState', 'updateRedirectInfo']),
			handleCheckState() {
				this.checkAllState(!this.isFullCheck);
			},
			handleSettle() {
				if (!this.checkedCount) return uni.$message('请选择要结算的商品!');
				if (!this.addstr) return uni.$message('请选择收货地址!');
				if (!this.token) return this.toLogin();
				this.payOrder();
			},
			showTips(time) {
				uni.showToast({
					icon: 'none'
					title: '请登录后再结算！' + time + ' 秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				});
			},
			toLogin() {
				this.seconds = 3;
				this.showTips(this.seconds);
				this.timer = setInterval(() => {
					if (this.seconds <= 0) {
						clearInterval(this.timer);
						uni.switchTab({
							url: '/pages/mine/mine',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						});
						return;
					}
					this.seconds--;
					this.showTips(this.seconds);
				}, 1000);
			},
			async payOrder() {
				const info = {
					orderPrice: 0.01,
					consigneeAddr: this.addstr,
					goods: this.list.filter(goods => goods.state).map(item => ({
						goods_id: item.id,
						goods_number: item.count,
						goods_price: item.price
					}));
				};
				const {
					data: res
				} = await uni.$http.post('/api/public/v1/my/orders/create', info)
				if (res.meta.status !== 200) return uni.$message('创建订单失败');
				const orderNumber = res.message.order_number;
				const {
					data: res2
				} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNumber
				})
				if (res2.meta.status !== 200) return uni.$message('预付订单生成失败!')
				const payInfo = res2.message.pay;
				const [err, succ] = await uni.requestPayment(payInfo);
				if (err) return uni.$message('订单未支付!');
				const {
					data: res3
				} = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
					order_number: orderNumber
				});
				if (res3.meta.status !== 200) return uni.$message('订单未支付!');
				uni.showToast({
					title: '支付完成！',
					icon: 'success'
				});
			}
		}
</script>

<style lang="scss">
	.settle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: white;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>