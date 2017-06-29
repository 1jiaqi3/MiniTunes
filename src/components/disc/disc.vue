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
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/rec');
          return;
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist);
          }
        });
      },
      _normalizeSongs(datas) {
        let res = [];
        datas.forEach((data) => {
          if (data.songid && data.albumid) {
            res.push(createSong(data));
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
