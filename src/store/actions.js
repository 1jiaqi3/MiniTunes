import * as types from './mutation-types';
import {playMode} from '../common/js/config';
import {shuffle} from '../common/js/util';

function findIdx(list, song) {
  return list.findIndex((item) => item.id === song.id);
}

export const selectPlay = function ({commit, state}, {list, idx}) {
  commit(types.SET_SEQ_LIST, list);
  if (state.mode === playMode.random) {
    let randomlist = shuffle(list);
    commit(types.SET_PLAYLIST, randomlist);
    idx = findIdx(randomlist, list[idx]);
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_CURRENT_IDX, idx);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const randomPlay = function({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQ_LIST, list);
  let randomlist = shuffle(list);
  commit(types.SET_PLAYLIST, randomlist);
  commit(types.SET_CURRENT_IDX, 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};
