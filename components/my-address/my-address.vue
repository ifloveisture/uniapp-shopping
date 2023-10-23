<template>
	<view>
		<view class="address-box" v-if="JSON.stringify(address) ==='{}'">
			<button type="primary" size="mini" class="btn" @click="handleChooseAddress">请选择收货地址+</button>
		</view>
		<view class="info" v-else @click="handleChooseAddress()">
			<view class="row1">
				<view class="left">
					<view class="username">
						收货人:<text>{{address.userName}}</text>
					</view>
				</view>
				<view class="right">
					<view class="phone">
						电话:<text>{{address.telNumber}}</text>
						<u-icon name="arrow-right" size="16"></u-icon>
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="left">收货地址:</view>
				<view class="right">{{addstr}}</view>
			</view>
		</view>
		<u-line class="address-border" :hair-line="false" color="#c0c0c0" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		name: "my-address",
		data() {
			return {

			};
		},
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addstr'])
		},
		methods: {
			...mapMutations('user', ['updateAddress']),
			async handleChooseAddress() {
				let [err, sucess] = await uni.chooseAddress().catch(err => err);
				if (err === null && sucess.errrMsg === 'chooseAddress:ok') this.updateAddress(sucess);
				if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) this.reAuth();
			},
			async reAuth() {
				const [err, confirmResult] = await uni.showModal({
					content: '检测到您没打开地址权限，是否去设置打开？',
					confirmText: "确认",
					cancelText: "取消",
				});
				if (err) return;
				if (confirmResult.cancel) return uni.$message('您取消了地址授权!');
				if (confirmResult.confirm) return uni.openSetting({
					success: (settingResult) => {
						if (settingResult.authSetting['scope.address']) return uni.$message('授权成功！请选择地址');
						else return uni.$message('您取消了地址授权！');
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.address-border {
		height: 5px;
	}

	.address-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90px;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 12px;
		height: 90px;
		padding: 0 5px;

		.row1 {
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;
				align-items: center;

				.phone {
					margin-right: 5px;
				}
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.left {
				white-space: nowrap;
			}
		}
	}
</style>