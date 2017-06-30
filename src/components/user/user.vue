<template>
  <transition name="slide">
    <div class="user">
      <div class="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper"></div>
      <div class="play-btn">
        <i class="icon-play"></i>
        <span class="text">Pick One For Me</span>
      </div>
      <div class="list-wrapper" ref="listWrapper"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'

  .user
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
</style>
