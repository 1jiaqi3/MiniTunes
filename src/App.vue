<template>
  <div id="app">
    <mheader></mheader>
    <mnav></mnav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import mheader from 'components/header/mheader';
  import mnav from 'components/mnav/mnav';

  export default {
    components: {
      mheader,
      mnav
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
