<template>
  
</template>
<script>
import api from '@/utils/api'
import request from '@/utils/request'
export default {
  name: 'Verify',
  mounted () {
    console.log(document.referrer)
    if (document.referrer == '') {
      this.$router.replace({
        path: '/error'
      })
    } else {
      let sign = encodeURIComponent(this.getQueryString('sign'))
      let appid = this.getQueryString('appid');
      let outuid = this.getQueryString('outuid');
      let balance = this.getQueryString('balance');
      let timestamp = this.getQueryString('timestamp');
      this.$cookies.set("outuid", outuid);
      this.$cookies.set("userId", appid);
      this.$cookies.set("balance", balance);
      request.get(`/third/v1/otc/checkSign?sign=${sign}&appid=${appid}&outuid=${outuid}&balance=${balance}&timestamp=${timestamp}`).then((res) => {
        if (res.code == 0) {
          Message.warning({
            message: res.msg,
            center: true
          })
        } else {
          this.$router.replace({
            path: '/index'
          })
        }
      })
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
      return unescape(r[2]);
      }
      return null;
    }
  }
}
</script>
