<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="fall" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.img">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singers"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdRotate">
                <img class="img" :src="currentSong.img"/>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-left">{{formattingTime(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressChange"></progress-bar>
            </div>
            <span class="time time-right">{{formattingTime(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableBtn">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableBtn">
              <i :class="playIcon" @click="togglePlay"></i>
            </div>
            <div class="icon i-right" @click="next" :class="disableBtn">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="pullup">
      <div class="mini-player" v-show="!fullScreen" @click.stop.prevent="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.img" :class="cdRotate"/>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singers"></p>
        </div>
        <div class="control">
          <i class="icon-mini" :class="miniIcon" @click.stop="togglePlay"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url"
           ref="audio" @canplay="ready"
           @error="error"
           @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex';
  import animations from 'create-keyframe-animation';
  import {prefixStyle} from '../../common/js/dom';
  import ProgressBar from '../../base/progress-bar/progress-bar';
  import {playMode} from '../../common/js/config';
  import {shuffle} from '../../common/js/util';

  const transform = prefixStyle('transform');

  export default {
    data() {
      return {
        songReady: false,
        currentTime: 0
      };
    },
    computed: {
      iconMode() {
        let res = 'icon-sequence';
        if (this.mode === playMode.loop) {
          res = 'icon-loop';
        } else if (this.mode === playMode.random) {
          res = 'icon-random';
        }
        return res;
      },
      playIcon() {
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
      },
      cdRotate() {
        return this.playing ? 'play' : 'play pause';
      },
      disableBtn() {
        return this.songReady ? '' : 'disable';
      },
      percent() {
        return this.currentTime / this.currentSong.duration;
      },
      ...mapGetters([
        'fullScreen',
        'playlist',
        'currentSong',
        'playing',
        'currentIdx',
        'mode',
        'seqList'
      ])
    },
    methods: {
      changeMode() {
        const mode = (this.mode + 1) % 3;
        this.setMode(mode);
        let list = null;
        if (mode === playMode.random) {
          list = shuffle(this.seqList);
        } else {
          list = this.seqList;
        }
        this.setPlayList(list);
        this.resetCurrentIdx(list);
      },
      resetCurrentIdx(list) {
        let idx = list.findIndex((item) => {
          return item.id === this.currentSong.id;
        });
        this.setCurrentIdx(idx);
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      },
      next() {
        if (!this.songReady) {
          return;
        }
        let idx = this.currentIdx + 1;
        if (idx === this.playlist.length) {
          idx = 0;
        }
        this.setCurrentIdx(idx);
        if (!this.playing) {
          this.togglePlay();
        }
        this.songReady = false;
      },
      prev() {
        if (!this.songReady) {
          return;
        }
        let idx = this.currentIdx - 1;
        if (idx === -1) {
          idx = this.playlist.length - 1;
        }
        this.setCurrentIdx(idx);
        if (!this.playing) {
          this.togglePlay();
        }
        this.songReady = false;
      },
      error() {
        this.songReady = true;
      },
      ready() {
        this.songReady = true;
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime;
      },
      formattingTime(interval) {
        interval = interval | 0;
        const minute = Math.floor(interval / 60);
        let second = interval % 60;
        let len = second.toString().length;
        while (len < 2) {
          second = '0' + second;
          len++;
        }
        return `${minute}:${second}`;
      },
      onProgressChange(percent) {
        this.$refs.audio.currentTime = this.currentSong.duration * percent;
      },
      back() {
        this.setFullScreen(false);
      },
      open() {
        this.setFullScreen(true);
      },
      enter(el, done) {
        const {x, y, scale} = this._getOrigPosScale();

        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          },
          50: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`
          }
        };
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        });
        animations.runAnimation(this.$refs.cdWrapper, 'move', done);
      },
      afterEnter() {
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = '';
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s';
        const {x, y, scale} = this._getOrigPosScale();
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        this.$refs.cdWrapper.addEventListener('transitionend', done);
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = '';
        this.$refs.cdWrapper.style[transform] = '';
      },
      _getOrigPosScale() {
        const origWidth = 40;
        const origPaddingLeft = 40;
        const origPaddingBottom = 30;
        const finalPaddingTop = 80;
        const finalWidth = window.innerWidth * 0.8;
        const scale = origWidth / finalWidth;
        const x = -(window.innerWidth / 2 - origPaddingLeft);
        const y = window.innerHeight - finalPaddingTop - finalWidth / 2 - origPaddingBottom;
        return {x, y, scale};
      },
      togglePlay() {
        this.setPlayingState(!this.playing);
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIdx: 'SET_CURRENT_IDX',
        setMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST'
      })
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (newSong.id === oldSong.id) {
          return;
        }
        this.$nextTick(() => {
          this.$refs.audio.play();
        });
      },
      playing(newPlaying) {
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause();
        });
      }
    },
    components: {
      ProgressBar
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
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position: absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .img
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
      &.fall-enter-active, &.fall-leave-active
        transition: all 0.4s
        .top
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.8, 1.3)
      &.fall-enter, &.fall-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0 auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
          .time-left
            text-align: left
          .time-right
            text-align: right
        .progress-bar-wrapper
          flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            i
              font-size: 30px
            &.disable
              color: $color-theme-d
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme

    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      right: 0
      bottom: 0
      height: 60px
      z-index: 180
      background: $color-highlight-background
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 20s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
