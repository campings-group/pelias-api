var autocompleteDefaults = require('./autocomplete_defaults');
var _ = require('lodash');

module.exports = _.merge({}, autocompleteDefaults, {
  'population:field': 'population',
  'population:modifier': 'none',
  'population:max_boost': 20,
  'population:weight': 3,
  'population:factor': 0.0002,
  
  // full text search
  'multi_match:ngrams_strict:type': 'best_fields', // (default value in ES).
  'multi_match:ngrams_strict:fuzziness': 'AUTO',
  'multi_match:ngrams_strict:minimum_should_match': '2<90%',
  'multi_match:first_tokens_only:type': 'best_fields',
  'multi_match:first_tokens_only:fuzziness': 'AUTO',
  'multi_match:first_tokens_only:minimum_should_match': '2<90%',
});
