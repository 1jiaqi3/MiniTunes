<template>
  <div class="header">
    <div class="icon"></div>
    <h1 class="title">Tune</h1>
    <router-link to="/user" class="user" tag="div">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    .title
      line-height: 44px
      font-size: $font-size-large

</style>
