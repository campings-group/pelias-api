var autocompleteDefaults = require('./autocomplete_defaults');
var _ = require('lodash');

module.exports = _.merge({}, autocompleteDefaults, {
  'population:field': 'population',
  'population:modifier': 'none',
  'population:max_boost': 20,
  'population:weight': 3,
  'population:factor': 0.0002,

  // Custom full text search parameters
  'multi_match:full_text_search:type': 'best_fields', // (default value in ES)
  'multi_match:full_text_search:boost': 1,
  'multi_match:full_text_search:field': 'name.default',
  'multi_match:full_text_search:zero_terms_query': 'NONE',

  'multi_match:full_text_search_fuzzy:fuzziness': 'AUTO', // (equivalent to AUTO:3,6)
  'multi_match:full_text_search_fuzzy:boost': 1,
  'multi_match:full_text_search_fuzzy:minimum_should_match': '2<90%',
  'multi_match:full_text_search_fuzzy:prefix_length': 0,
  'multi_match:full_text_search_fuzzy:max_expansions': 50,
});
