import * as types from './mutation-types';

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_SEQ_LIST](state, list) {
    state.seqList = list;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_IDX](state, idx) {
    state.currentIdx = idx;
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc;
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList;
  }
};

export default mutations;
