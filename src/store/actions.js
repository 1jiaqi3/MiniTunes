import * as types from './mutation-types';
export const selectPlay = function ({commit, state}, {list, idx}) {
  commit(types.SET_SEQ_LIST, list);
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_CURRENT_IDX, idx);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};
