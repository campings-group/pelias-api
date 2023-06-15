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
                  'query': 'test',
                  'boost': 1,
                  'type': 'best_fields',
                  'zero_terms_query': 'NONE'
                }
              },
              {
                'multi_match': {
                  'fields': ['pure.name.default', 'pure.name.en'],
                  'query': 'test',
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
              'match_all': {

              }
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
      ],
      'filter': [
        {
          'geo_distance': {
            'distance': '20km',
            'distance_type': 'plane',
            'center_point': {
              'lat': 37.83239,
              'lon': -122.35698
            }
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
