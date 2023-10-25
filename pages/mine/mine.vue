<template>
	<view class="mine">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import bagdeMix from '@/mixins/badge.js';
	import { mapState } from 'vuex';
	
	export default {
		mixins: [bagdeMix],
		computed: {
			...mapState('user',['token']),
		}
	}
</script>

<style lang="scss">
page,
.mine {
	height: 100%;
}
</style>
