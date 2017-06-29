import {playMode} from '../common/js/config';
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  seqList: [],
  mode: playMode.seq,
  currentIdx: -1,
  disc: {},
  topList: {}
};

export default state;
