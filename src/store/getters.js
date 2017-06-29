export const singer = state => state.singer;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playlist = state => state.playlist;
export const seqList = state => state.seqList;
export const mode = state => state.mode;
export const currentIdx = state => state.currentIdx;
export const currentSong = (state) => {
  return state.playlist[state.currentIdx] || {};
};
export const disc = state => state.disc;
export const topList = state => state.topList;
