module.exports = {
  'query': {
    'bool': {
      'must': [{
        'multi_match': {
          'fields': ['name.default', 'name.en'],
          'analyzer': 'peliasQuery',
          'query': 'test',
          'boost': 1,
          'type': 'phrase',
          'slop': 3
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
              'factor': 0.0002,
            },
            'weight': 3
          }]
        }
      }],
      'filter': [{
        'geo_bounding_box': {
          'type': 'indexed',
          'center_point': {
            'top': 37.83239,
            'right': -122.35698,
            'bottom': 37.70808,
            'left': -122.51489
          }
        }
      }]
    }
  },
  'sort': [ '_score' ],
  'size': 20,
  'track_scores': true
};
