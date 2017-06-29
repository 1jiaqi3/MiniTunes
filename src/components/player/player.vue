<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      Player
    </div>
    <div class="mini-player" v-show="!fullScreen">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist'
      ])
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background

</style>
