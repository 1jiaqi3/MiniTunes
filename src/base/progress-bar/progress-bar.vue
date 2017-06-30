<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
           ref="btn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from '../../common/js/dom';
  const transform = prefixStyle('transform');
  const BALL_RADIUS = 16;
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {};
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.clientWidth;
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return;
        }
        const dx = e.touches[0].pageX - this.touch.startX;
        const offset = Math.min(Math.max(0, this.touch.left + dx), this.$refs.progressBar.clientWidth - BALL_RADIUS);
        this.$refs.progress.style.width = `${offset}px`;
        this.$refs.btn.style[transform] = `translate3d(${offset}px, 0, 0)`;
      },
      progressTouchEnd() {
        this.touch.initiated = false;
        this._changeProgress();
      },
      progressClick(e) {
        this.$refs.progress.style.width = `${e.offsetX}px`;
        this.$refs.btn.style[transform] = `translate3d(${e.offsetX}px, 0, 0)`;
        this._changeProgress();
      },
      _changeProgress() {
        const barWidth = this.$refs.progressBar.clientWidth - BALL_RADIUS;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - BALL_RADIUS;
          const offset = newPercent * barWidth;
          this.$refs.progress.style.width = `${offset}px`;
          this.$refs.btn.style[transform] = `translate3d(${offset}px, 0, 0)`;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: deeppink
</style>
