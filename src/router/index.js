import Vue from 'vue';
import Router from 'vue-router';
import Rec from '../components/recommendation/rec';
import Rank from '../components/rank/rank';
import Search from '../components/search/search';
import Singer from '../components/singer/singer';
import SingerDetail from '../components/singer-detail/singer-detail';
import Disc from '../components/disc/disc';
import TopList from '../components/top-list/top-list';
import User from '../components/user/user';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/rec',
      component: Rec,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: User
    }
  ]
});
