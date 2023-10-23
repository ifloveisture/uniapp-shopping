<template>
	<view class="goods" @click="handleClick(goods)">
		<view class="left">
			<radio @click="handleSelect()" :checked="goods.state" color="#c00000" v-if="selectable"></radio>
			<image :src="goods.small_logo || defaultPic" class="pic"></image>
		</view>
		<view class="right">
			<view class="name">{{ goods.name }}</view>
			<view class="info">
				<view class="price">￥{{ goods.price | toFixed}}</view>
				<u-number-box @blur="watchInput" v-if="numControl" :min="1" v-model="number" @change="numChange"></u-number-box>
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
			},
			selectable: {
				type: Boolean,
				default: false
			},
			numControl: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2);
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				number: 1
			};
		},
		methods: {
			handleClick(item) {
				this.$emit('clickGoods',{id: item.id});
			},
			handleSelect() {
				this.$emit('select',{
					id: this.goods.id,
					state: !this.goods.state
				});
			},
			numChange(val) {
				this.$emit('num-change',{
					id: this.goods.id,
					num: ++val
				})
			},
			watchInput() {
				let result = parseInt(this.number);
				if(!result) this.number = 1;
			}
		}
	}
</script>

<style lang="scss">
	.goods {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.left {
			display: flex;
			justify-content: space-between;
			align-items: center;
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
			
			.info {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>