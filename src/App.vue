<template>
  <div id="app">
    <header class="header">
      <img src="@/assets/logo.png" class="logo" alt="">
      <button @click="toRecord">交易记录</button>
    </header>
    <router-view/>
    <footer class="footer">
      版权所有 © 2017 Mozilla Firefox. 北京灵思创奇信息技术有限公司
    </footer>
  </div>
</template>

<script>
import api from '@/utils/api'
export default {
  name: 'App',
  methods: {
    toRecord () {
      api.orderList()
    }
  }
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
  img{
    margin-left: 6.4vw;
    width: 157px;
    height: 33px;
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

