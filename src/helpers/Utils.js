import _ from 'lodash';
import qs from 'query-string';

class Utils {
  static formatNumber(number) {
    if (!number) {
      return ' ';
    }
    return (`${(+number || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '')}`).replace('$-', '-$');
  }

  static queryParse = (keys = [], arrayFormat, search = window.location.search) => {
    const query = qs.parse(search, { arrayFormat });
    if (!_.isEmpty(keys)) {
      keys.forEach((key) => {
        if (!query[key]) {
          query[key] = [];
        } else if (_.isString(query[key])) {
          query[key] = [query[key]];
        }
      });
    }
    return query;
  };

  static queryStringify = (obj) => qs.stringify(obj, {
    arrayFormat: 'comma',
    skipNull: true,
    skipEmptyString: true,
  });
}

export default Utils;
