<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox"></search-box>
    </div>
    <div class="shortcut-box-wrapper">
      <div class="shortcut">
        <div class="hot-search">
          <h1 class="title">Hot Searches</h1>
          <ul>
            <li class="item" v-for="item in hotSearch" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from '../../base/search-box/search-box';
  import {getHotSearch} from '../../common/api/search';
  import {ERR_OK} from '../../common/api/config';
  export default {
    created() {
      this._getHotSearch();
    },
    data() {
      return {
        hotSearch: []
      };
    },
    methods: {
      _getHotSearch() {
        getHotSearch().then((res) => {
          if (res.code === ERR_OK) {
            this.hotSearch = res.data.hotkey.slice(0, 20);
          }
        });
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query);
      }
    },
    components: {
      SearchBox
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-box-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-search
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d

</style>
