/**
 * Created by mac on 27/06/2017.
 */
import jsonp from '../../common/js/jsonp';
import {commonParams, options} from './config';

export function getPer() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 150,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  });
  return jsonp(url, data, options);
}

export function getSingerDetail(id) {
  const url = 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: id,
    g_tk: 1664029744
  });
  return jsonp(url, data, options);
}
