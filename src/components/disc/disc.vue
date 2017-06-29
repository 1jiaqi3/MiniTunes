<template>
  <transition name="slide">
    <music-list :title="title" :bgimg="bgimg" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../../components/music-list/music-list';
  import {mapGetters} from 'vuex';
  import {getSongList} from '../../common/api/recommend';
  import {ERR_OK} from '../../common/api/config';
  import {createSong} from '../../common/js/song';
  export default {
    data() {
      return {
        songs: []
      };
    },
    computed: {
      title() {
        return this.disc.dissname;
      },
      bgimg() {
        return this.disc.imgurl;
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList();
    },
    methods: {

    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
