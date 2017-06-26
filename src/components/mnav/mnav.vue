<template>
  <nav class="nav">
    <router-link to="/rec" tag="div" class="nav-item">
      <span class="nav-link">Hits</span>
    </router-link>
    <router-link to="/singer" tag="div" class="nav-item">
      <span class="nav-link">Performers</span>
    </router-link>
    <router-link to="/rank" tag="div" class="nav-item">
      <span class="nav-link">Ranking</span>
    </router-link>
    <router-link to="/search" tag="div" class="nav-item">
      <span class="nav-link">Search</span>
    </router-link>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable.styl'

  .nav
    display: flex
    height: 44px
    .nav-item
      flex: 1
      line-height: 44px
      text-align: center
      font-size: $font-size-medium
      .nav-link
        padding-bottom: 6px
        color: $color-text-l
    .router-link-active
      .nav-link
        color: $color-theme
        border-bottom: 2px solid $color-theme


</style>
