<template>
  <transition name="slide">
    <music-list :title="title" :bgimg="bgimg" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../../components/music-list/music-list';
  import {mapGetters} from 'vuex';
  import {getMusicList} from '../../common/api/rank';
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
        return this.topList.topTitle;
      },
      bgimg() {
        if (this.songs.length) {
          return this.songs[0].img;
        }
        return this.topList.picUrl;
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      this._getMusicList();
    },
    methods: {
      _getMusicList() {
        if (!this.topList.id) {
          this.$router.push('/rank');
          return;
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist);
          }
        });
      },
      _normalizeSongs(songs) {
        let res = [];
        songs.forEach((song) => {
          const data = song.data;
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
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
