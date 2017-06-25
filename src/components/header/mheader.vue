<template>
  <div class="header">
    <h1 class="title">Tune</h1>
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
      display: inline-block
      line-height: 44px
      font-size: $font-size-large

</style>
