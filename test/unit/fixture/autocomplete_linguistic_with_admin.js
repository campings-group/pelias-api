module.exports = {
  'query': {
    'bool': {
      'must': [
        {
          'bool': {
            'should': [
              {
                'multi_match': {
                  'fields': ['name.default', 'name.en'],
                  'analyzer': 'peliasQuery',
                  'query': 'one two three',
                  'boost': 1,
                  'type': 'best_fields',
                  'zero_terms_query': 'NONE'
                }
              },
              {
                'multi_match': {
                  'fields': ['pure.name.default', 'pure.name.en'],
                  'query': 'one two three',
                  'boost': 1,
                  'type': 'best_fields',
                  'fuzziness': 'AUTO',
                  'minimum_should_match': '2<90%',
                  'prefix_length': 0,
                  'max_expansions': 50
                }
              }
            ]
          }
        }
      ],
      'should': [
        {
          'function_score': {
            'query': {
              'match_all': {}
            },
            'max_boost': 20,
            'functions': [
              {
                'field_value_factor': {
                  'modifier': 'log1p',
                  'field': 'popularity',
                  'missing': 1
                },
                'weight': 1
              }
            ],
            'score_mode': 'first',
            'boost_mode': 'replace'
          }
        },
        {
          'function_score': {
            'max_boost': 20,
            'functions': [
              {
                'field_value_factor': {
                  'modifier': 'none',
                  'field': 'population',
                  'missing': 1,
                  'factor': 0.0002
                },
                'weight': 3
              }
            ],
            'score_mode': 'first',
            'boost_mode': 'replace'
          }
        }
      ]
    }
  },
  'size': 20,
  'track_scores': true,
  'sort': [
    '_score'
  ]
};
