<template>
  <div class="rec">
    <scroll class="rec-content" :data="discList" ref="scroll">
      <div>
        <div class="slides-wrapper" v-if="recs.length">
          <slider>
            <div v-for="item in recs">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" class="needsclick"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="rec-list">
          <h1 class="list-title">On Trend</h1>
          <ul>
            <li v-for="item in discList" class="item" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" @load="loadImg"/>
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll';
  import {getRec, getDiscList} from '../../common/api/recommend';
  import {ERR_OK} from '../../common/api/config';
  import Slider from '../../base/slider/slider';
  import Loading from '../../base/loading/loading';
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        recs: [],
        discList: []
      };
    },
    created() {
      this._getRec();
      this._getDiscList();
    },
    methods: {
      _getRec() {
        getRec().then((res) => {
          if (res.code === ERR_OK) {
            this.recs = res.data.slider;
          }
        });
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
          }
        });
      },
      loadImg() {
        if (!this.loaded) {
          this.$refs.scroll.refresh();
          this.loaded = true;
        }
      },
      selectItem(item) {
        this.$router.push({
          path: `/rec/${item.dissid}`
        });
        this.setDisc(item);
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .rec
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
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
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-wrapper
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
