export default class Song {
  constructor({id, mid, singers, name, album, duration, img, url}) {
    this.id = id;
    this.mid = mid;
    this.singers = singers;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.img = img;
    this.url = url;
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singers: filterSingers(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  });
}

function filterSingers(singers) {
  let res = [];
  if (!singers) {
    return '';
  }
  singers.forEach((singer) => {
    res.push(singer.name);
  });
  return res.join('/');
}
