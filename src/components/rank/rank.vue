<template>
  <div class="rank">
    <div class="topList">
      <ul>
        <li class="item">
          <div class="icon">
            <img/>
          </div>
          <ul class="songList">
            <li class="song">
              <span></span>
              <span></span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getTopList} from '../../common/api/rank';
  import {ERR_OK} from '../../common/api/config';
  export default {
    created() {
      this._getTopList();
    },
    methods: {
      _getTopList() {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.topList);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'

</style>
