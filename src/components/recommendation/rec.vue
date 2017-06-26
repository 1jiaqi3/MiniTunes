<template>
  <div class="rec">
    <div class="rec-content">
      <div class="slides-wrapper" v-if="recs.length">
        <slider>
          <div v-for="item in recs">
            <a :href="item.linkUrl">
              <img :src="item.picUrl"/>
            </a>
          </div>
        </slider>
      </div>
      <div class="rec-list">
        <h1 class="list-title">On Trend</h1>
        <ul>

        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRec} from '../../common/api/recommend';
  import {ERR_OK} from '../../common/api/config';
  import Slider from '../../base/slider/slider';

  export default {
    data() {
      return {
        recs: []
      };
    },
    created() {
      this._getRec();
    },
    methods: {
      _getRec() {
        getRec().then((res) => {
          if (res.code === ERR_OK) {
            this.recs = res.data.slider;
          }
        });
      }
    },
    components: {
      Slider
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .rec
    position: fixed
    width: 100%
    top: 88px
    .rec-content
      height: 100%
      overflow: hidden
      .slides-wrapper
        position: relative
      .rec-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d

</style>
