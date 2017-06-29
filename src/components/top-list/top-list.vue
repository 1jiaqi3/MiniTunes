<template>
  <transition name="slide">
    <music-list :title="title" :bgimg="bgimg"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../../components/music-list/music-list';
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      title() {
        return this.topList.topTitle;
      },
      bgimg() {
        return this.topList.picUrl;
      },
      ...mapGetters([
        'topList'
      ])
    },
    components: {
      MusicList
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
