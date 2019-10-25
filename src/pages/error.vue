<template>
  
</template>
<script>
export default {
  beforeCreate () {
    this.$message({
      message: '非正常途径访问',
      type: 'warning',
      center: true
    })
  }
}
</script>
