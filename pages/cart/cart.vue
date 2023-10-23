<template>
	<view class="cart" v-if="list.length !== 0">
		<view class="cart-title">
			<u-icon name="shopping-cart"></u-icon>
			<text>购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(goods) in list" :key="goods.id">
				<uni-swipe-action-item :right-options="options" @click="handleSwipeClick(goods)">
					<my-goods @num-change="handleNumChange" :num-control="true" @select="handleSelect()" :selectable="true"
						:goods="goods"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import bagdgeMix from '@/mixins/badge.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		mixins: [bagdgeMix],
		computed: {
			...mapState('cart', ['list'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('cart', ['changeGoodsState', 'changeGoodsCount', 'removeGoods']),
			handleSelect(info) {
				this.changeGoodsState(info);
			},
			handleNumChange(info) {
				this.changeGoodsCount(info);
			},
			handleSwipeClick(goods) {
				this.removeGoods(goods.id);
			},
		}
	}
</script>

<style lang="scss">
	.cart {
		padding-bottom: 50px;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;
		
		.empty-img {
			width: 90px;
			height: 90px;
		}
		
		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}

	.cart-title {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		text {
			margin-left: 10px;
		}
	}
</style>