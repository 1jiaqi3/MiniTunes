<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bgimg="bgimg"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import {getSingerDetail} from '../../common/api/performer';
  import {ERR_OK} from '../../common/api/config';
  import {createSong} from '../../common/js/song';
  import MusicList from '../../components/music-list/music-list';

  export default {
    data() {
      return {
        songs: []
      };
    },
    computed: {
      title() {
        return this.singer.name;
      },
      bgimg() {
        return this.singer.avatar;
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail();
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return;
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list);
          }
        });
      },
      _normalizeSongs(rawDatas) {
        let res = [];
        rawDatas.forEach((data) => {
          let {musicData} = data;
          if (musicData.songid && musicData.albummid) {
            res.push(createSong(musicData));
          }
        });
        return res;
      }
    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
