import jsonp from '../../common/js/jsonp';
import {commonParams, options} from './config';
export function getHotSearch() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'H5',
    needNewCode: 1
  });
  return jsonp(url, data, options);
}
