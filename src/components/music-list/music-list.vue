<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-arrow_lift"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-img" :style="bgStyle" ref="bgimg">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" class="list" ref="list"
            :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll';
  import SongList from '../../components/song-list/song-list';
  import {prefixStyle} from '../../common/js/dom';

  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('backdrop-filter');
  const RESERVED_HEIGHT = 40;

  export default {
    data() {
      return {
        scrollY: 0
      };
    },
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
      this.probeType = 3;
      this.listenScroll = true;
    },
    computed: {
      bgStyle() {
        return `background-image: url(${this.bgimg})`;
      }
    },
    mounted() {
      this.imgHeight = this.$refs.bgimg.clientHeight;
      this.minTranslateY = -this.imgHeight + RESERVED_HEIGHT;
      this.$refs.list.$el.style.top = `${this.imgHeight}px`;
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y;
      }
    },
    watch: {
      scrollY(newY) {
        let z = 0;
        let scale = 1;
        let translateY = Math.max(this.minTranslateY, newY);
        let blur = 0;
        this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
        if (newY < this.minTranslateY) {
          z = 10;
          this.$refs.bgimg.style.paddingTop = 0;
          this.$refs.bgimg.style.height = `${RESERVED_HEIGHT}px`;
        } else {
          this.$refs.bgimg.style.paddingTop = '70%';
          this.$refs.bgimg.style.height = 0;
        }
        const percent = Math.abs(newY / this.imgHeight);
        // when scroll direction is down
        if (newY > 0) {
          scale = 1 + percent;
          z = 10;
        } else {
          blur = Math.min(20 * percent, 20);
        }
        this.$refs.bgimg.style.zIndex = z;
        this.$refs.bgimg.style[transform] = `scale(${scale})`;
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      }
    },
    components: {
      Scroll,
      SongList
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
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)

    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
    .bg-layer
      position: relative
      height: 100%
      background: $color-background

</style>
