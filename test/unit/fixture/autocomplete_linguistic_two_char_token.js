module.exports = {
  'query': {
    'bool': {
      'must': [{
        'multi_match': {
          'fields': ['name.default', 'name.en'],
          'analyzer': 'peliasQuery',
          'query': 'te',
          'boost': 1,
          'type': 'best_fields',
          'fuzziness': 'AUTO',
          'minimum_should_match': '2<90%'
        }
      }],
      'should':[{
        'function_score': {
          'query': {
            'match_all': {}
          },
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'log1p',
              'field': 'popularity',
              'missing': 1
            },
            'weight': 1
          }]
        }
      },{
        'function_score': {
          'max_boost': 20,
          'score_mode': 'first',
          'boost_mode': 'replace',
          'functions': [{
            'field_value_factor': {
              'modifier': 'none',
              'field': 'population',
              'missing': 1,
              'factor': 0.0002
            },
            'weight': 3
          }]
        }
      }],
      'filter': [{
        'terms': {
          'layer': [
            'venue',
            'street',
            'country',
            'macroregion',
            'region',
            'county',
            'localadmin',
            'locality',
            'borough',
            'neighbourhood',
            'continent',
            'empire',
            'dependency',
            'macrocounty',
            'macrohood',
            'microhood',
            'disputed',
            'postalcode',
            'ocean',
            'marinearea'
          ]
        }
      }]
    }
  },
  'sort': [ '_score' ],
  'size': 20,
  'track_scores': true
};
