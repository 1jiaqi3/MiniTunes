<template>
  <div class="suggestion">
    <ul class="sug-list">
      <li class="sug-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import {search} from '../../common/api/search';
  import {ERR_OK} from '../../common/api/config';
  import {filterSingers} from '../../common/js/song';
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSingers: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: []
      };
    },
    methods: {
      search() {
        search(this.query, this.page, this.showSingers).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data);
          }
        });
      },
      _genResult(data) {
        let res = [];
        if (data.zhida && data.zhida.singerid) {
          res.push({...data.zhida, ...{type: 'singer'}});
        }
        if (data.song) {
          res = res.concat(data.song.list);
        }
        return res;
      },
      getIconClass(item) {
        if (item.type === 'singer') {
          return 'icon-mine';
        } else {
          return 'icon-music';
        }
      },
      getName(item) {
        if (item.type === 'singer') {
          return item.singername;
        } else {
          return `${item.songname}-${filterSingers(item.singer)}`;
        }
      }
    },
    watch: {
      query() {
        this.search();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'

  .suggestion
    height: 100%
    overflow: hidden
    .sug-list
      padding: 0 30px
      .sug-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
      .name
        flex: 1
        font-size: $font-size-medium
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
