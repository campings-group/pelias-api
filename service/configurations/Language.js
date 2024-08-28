const url = require('url');
const logger = require('pelias-logger').get('api');

const _ = require('lodash');

const ServiceConfiguration = require('pelias-microservice-wrapper').ServiceConfiguration;

class Language extends ServiceConfiguration {
  constructor(o) {
    super('language', o);
  }

  getParameters(req, res) {
    logger.info('get parameters for language');
    _.get(res, 'data', []).reduce((acc, doc) => {
      console.log(doc);
      Array.prototype.push.apply(acc, _.values(_.pickBy(doc.parent, (v, k) => _.endsWith(k, '_id') ) ) );
      return acc;
    }, []);
    // find all the values for all keys with names that end with '_id'
    const ids = _.get(res, 'data', []).reduce((acc, doc) => {

      logger.info('doc', doc.parent);
      Array.prototype.push.apply(acc, _.values(_.pickBy(doc.parent, (v, k) => _.endsWith(k, '_id') ) ) );
      return acc;
    }, []);

    const lang = _.get(req, 'clean.lang.iso6393');
    const parameters = {
      // arrays will be nested, so flatten first, then uniqify, and finally join elements with comma
      ids: _.uniq(_.flattenDeep(ids)).join(',')
    };

    logger.info('parameters', parameters);

    if (lang) {
      parameters.lang = lang;
    }

    return parameters;

  }

  getUrl(req) {
    return url.resolve(this.baseUrl, 'parser/findbyid');
  }

}

module.exports = Language;
