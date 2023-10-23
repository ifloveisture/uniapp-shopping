<template>
	<view class="settle">
		<label class="radio" @click="handleCheckState">
			<radio color="#c00000" :checked="isFullCheck"></radio>
			<text>全选</text>
		</label>
		<view class="amount">
			合计:<text>￥{{ amount }}</text>
		</view>
		<view class="btn">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
	import { map } from 'core-js/fn/dict';
import { mapGetters,mapMutations } from 'vuex'
	
	export default {
		name:"my-settle",
		computed: {
			 ...mapGetters('cart', ['checkedCount','total','amount']),
			 isFullCheck() {
				 return this.total === this.checkedCount;
			 },
		}
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('cart',['checkAllState']),
			handleCheckState() {
				this.checkAllState(!this.isFullCheck);
			}
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