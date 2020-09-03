<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		hahahah
		<button @click="wsInit">重连ws</button>
		<button @click="wsSendMessage">发送消息</button>
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "App",
	components: {
		HelloWorld,
	},
	data() {
		return {
			ws: null,
		};
	},
	created() {
		this.wsInit();
	},
	methods: {
		wsSendMessage() {
			this.ws.send("只不过发个数据而已");
		},
		wsInit() {
			if (this.ws) this.ws.close();
			this.ws = new WebSocket(`ws://localhost:3000/`);
			this.ws.onopen = this.wsOnOpen; // 挂载打开链接时的回调
			this.ws.onerror = this.wsOnError; // 挂载发生错误时的回调
			this.ws.onmessage = this.wsOnMessage; // 挂载收到消息的回调
			this.ws.onclose = this.wsOnClose; // 挂载关闭时的回调
		},
		wsOnOpen() {
			console.log("ws：打开链接成功！");
		},
		wsOnError() {
			console.log("ws：发生错误！");
		},
		wsOnMessage(e) {
			console.log(`ws：收到后台发来的消息 ${e.data}`);
		},
		wsOnClose() {
			console.log("ws：关闭链接！");
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
