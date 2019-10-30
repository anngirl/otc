<template>
  <div id="app">
    <header class="header" v-if="showHeader">
      <router-link to="/">
        <div class="logo">
          <img :src="logo" alt="">
        </div>
      </router-link>
      <button @click="toRecord">交易记录</button>
    </header>
    <router-view />
  </div>
</template>

<script>
import api from '@/utils/api'
import dess from '@/utils/dess'
import logo from '@/assets/logo.png'
export default {
  name: 'App',
  data () {
    return {
      showHeader: false,
      info: '',
      logo
    }
  },
  mounted () {
    // 点击返回跳转至首页
    window.onpopstate = () => {
      this.$router.replace({
        path: '/'
      })  //输入要返回的上一级路由地址
    }

    // 安全访问
    if (sessionStorage.getItem('isOk') != null) {
    } else {
      this.$router.replace({
        path: '/error'
      })
    }
    // 404页面不显示顶部导航
    if (this.$route.path === '/error') {
      this.showHeader = false
    } else {
      this.showHeader = true
    }

    // document.oncontextmenu = function(){
    // 　return false;
    // }
    document.onkeydown = function(e) {	
		  if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 73 || e.keyCode === 74 || e.keyCode  === 80 || e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 86 || e.keyCode === 117)) {
		 	  return false;
		  } 
		  if(e.keyCode==18||e.keyCode==123){
		  	return false
		  }
	  }
  },
  methods: {
    toRecord () {
      api.orderList()
    }
  },
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
::-webkit-input-placeholder { /* WebKit browsers */
  color: #999999;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #999999;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #999999;
}
button{
  outline: none;
  border: none;
  background-color: transparent;
}
input{
  outline: none;
}
*{
  margin: 0;
  padding: 0;
}
</style>
<style lang="less" scoped>
.header{
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.03);
  align-items: center;
  height: 90px;
  .logo{
    margin-left: 6.4vw;
    width: 157px;
    height: 33px;
    img{
      width: 157px;
      height: 33px;
    }
  }
  
  button{
    cursor: pointer;
    margin-right: 6.4vw;
    width: 110px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    color: #ffffff;
    background-color: #2D85F0;
    font-size: 14px;
  }
}
.footer{
  font-size: 16px;
  color: rgba(#787878, 0.8);
  line-height: 22px;
  position: fixed;
  bottom: 0;
  text-align: center;
  width: 100%;
}
</style>

