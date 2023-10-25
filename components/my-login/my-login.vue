<template>
	<view class="login">
		<u-icon size="100" color="#afafaf"></u-icon>
		<button type="primary" class="btn" @click="getUserInfo">一键登录</button>
		<view class="tips">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';

	export default {
		name: "my-login",
		computed: {
			...mapState('user',['redirectInfo']),
		},
		methods: {
			...mapMutations('user', ['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(e) {
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$message('您取消了登录授权！');
				this.updateUserInfo(e.detail.userInfo);
				this.getToken(e.detail);
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err);
				if (err || res.errMsg !== 'login:ok') return uni.$message('登录失败！');
				console.log(res);
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				const {
					data: loginResult
				} = await uni.$http.post('/api/public/v1/users/wxlogin', query);
				if (loginResult.meta.status !== 200) return uni.$message('登录失败！');
				uni.$message('登录成功');
				this.updateToken(loginResult.message.token);
				this.back();
			},
			back() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null);
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 750rpx;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 40px;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips {
			font-size: 12px;
			color: gray;
		}
	}
</style>