<template>
	<view class="info">
		<view class="top">
			<u-avatar :src="userInfo.avatarUrl"></u-avatar>
			<view class="username">{{ userInfo.nickName }}</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<u-icon></u-icon>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<u-icon></u-icon>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<u-icon></u-icon>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<u-icon></u-icon>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>收货地址</text>
						<u-icon size="15"></u-icon>
					</view>
					<view class="panel-item">
						<text>联系客服</text>
						<u-icon size="15"></u-icon>
					</view>
					<view class="panel-item" @click="handleLogout">
						<text>退出登录</text>
						<u-icon size="15"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		name: "my-userinfo",
		computed: {
			...mapState('user', ['userInfo'])
		},
		methods: {
			...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			async handleLogout() {
				const [err,success] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗?'
				}).catch(err => err);
				
				if(success && success.confirm) {
					this.updateAddress({});
					this.updateToken('');
					this.updateUserInfo({});
				}
			}
		}
	}
</script>

<style lang="scss">
	.info {
		height: 100%;
		background-color: #f4f4f4;

		.top {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 400rpx;
			background-color: #c00000;

			.username {
				color: white;
				font-weight: bold;
				font-size: 16px;
				margin-top: 10px;
			}
		}
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: -10px;

		.panel {
			background-color: #fff;
			border-radius: 3px;
			margin-bottom: 8px;

			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
			}

			.panel-body {
				display: flex;
				justify-content: space-around;

				:nth-child(3) {
					.panel-item {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 45px;
						font-size: 15px;
						padding: 0 10px;
					}
				}

				.panel-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					font-size: 13px;
					padding: 10px 0;
				}
			}
		}
	}
</style>