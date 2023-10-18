<template>
	<view class="my-search-container" :style="{backgroundColor: bgcolor}">
		<view class="my-search-box" :style="{borderRadius: radius + 'px'}" @click="handleSearch">
			<u-icon name="search" size="17" color="#fff"></u-icon>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			handleSearch() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 36px;
		background-color: #fff;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>