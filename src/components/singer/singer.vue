<template>
  <div class="singer">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getPer} from '../../common/api/performer';
  import {ERR_OK} from '../../common/api/config';
  import Singer from '../../common/js/singer';
  import ListView from '../../base/listview/listview';
  import {mapMutations} from 'vuex';

  const TREND_LEN = 10;
  export default {
    data() {
      return {
        singers: []
      };
    },
    created() {
      this._getSingerList();
    },
    methods: {
      _getSingerList() {
        getPer().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            this.singers = this._normalizeSinger(this.singers);
          }
        });
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: 'Trending',
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < TREND_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }));
          }
          // key is the alphabetical index
          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        });
        return this._sortSingerList(map);
      },
      _sortSingerList(map) {
        let trends = [];
        let res = [];
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/) && key !== 'hot') {
            res.push(val);
          } else if (key === 'hot') {
            trends.push(val);
          }
        }
        res.sort((i, j) => {
          return i.title.charCodeAt(0) - j.title.charCodeAt(0);
        });
        return trends.concat(res);
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.setSinger(singer);
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
