import Vue from 'vue';
import Router from 'vue-router';
import Rec from '../components/recommendation/rec';
import Rank from '../components/rank/rank';
import Search from '../components/search/search';
import Singer from '../components/singer/singer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/rec',
      component: Rec
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
});
