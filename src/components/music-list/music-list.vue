<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-arrow_lift"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-img" :style="bgStyle">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      bgimg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    created() {
      console.log(this.bgimg);
    },
    computed: {
      bgStyle() {
        return `background-image: url(${this.bgimg})`;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position: absolute
      top: 16px
      left: 16px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 50px
      font-size: $font-size-large
      color: $color-text
    .bg-img
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
  
</style>
