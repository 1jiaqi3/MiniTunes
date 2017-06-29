<template>
  <div id="app">
    <mheader></mheader>
    <mnav></mnav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import mheader from 'components/header/mheader';
  import mnav from 'components/mnav/mnav';
  import Player from 'components/player/player';

  export default {
    components: {
      mheader,
      mnav,
      Player
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
