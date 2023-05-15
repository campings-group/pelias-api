function generateQuery (clean) {
  const { text, layers, querySize } = clean;
  // const { lang: { iso6391: lang } } = clean;
  const lang = 'en';

  return {
    type: 'autocomplete',
    body: {
      size: querySize,
      query: {
        bool: {
          must: [
            {
              constant_score: {
                filter: {
                  multi_match: {
                    query: text,
                    fields: ['name.default^1.0', `name.${lang}^1.0`],
                    type: 'phrase',
                    operator: 'OR',
                    analyzer: 'peliasQuery',
                    slop: 3,
                    prefix_length: 0,
                    max_expansions: 50,
                    zero_terms_query: 'NONE',
                    auto_generate_synonyms_phrase_query: true,
                    fuzzy_transpositions: true,
                    boost: 100.0,
                  },
                },
                boost: 1.0,
              },
            },
          ],
          filter: [
            {
              terms: {
                layer: layers,
                boost: 1.0,
              },
            },
            {
              bool: {
                should: [
                  {
                    terms: {
                      layer: layers,
                      boost: 1.0,
                    },
                  },
                  {
                    geo_distance: {
                      center_point: [2.45, 46.61],
                      distance: 600000.0,
                      distance_type: 'plane',
                      validation_method: 'STRICT',
                      ignore_unmapped: false,
                      boost: 1.0,
                    },
                  },
                ],
                adjust_pure_negative: true,
                minimum_should_match: '1',
                boost: 1.0,
              },
            },
          ],
          should: [
            {
              function_score: {
                query: {
                  match_all: {
                    boost: 1.0,
                  },
                },
                functions: [
                  {
                    filter: {
                      match_all: {
                        boost: 1.0,
                      },
                    },
                    weight: 15.0,
                    exp: {
                      center_point: {
                        origin: {
                          lat: 46.61,
                          lon: 2.45,
                        },
                        offset: '0km',
                        scale: '50km',
                        decay: 0.5,
                      },
                      multi_value_mode: 'MIN',
                    },
                  },
                ],
                score_mode: 'avg',
                boost_mode: 'replace',
                max_boost: 3.4028235e38,
                boost: 1.0,
              },
            },
            {
              function_score: {
                query: {
                  match_all: {
                    boost: 1.0,
                  },
                },
                functions: [
                  {
                    filter: {
                      match_all: {
                        boost: 1.0,
                      },
                    },
                    weight: 1.0,
                    field_value_factor: {
                      field: 'popularity',
                      factor: 1.0,
                      missing: 1.0,
                      modifier: 'log1p',
                    },
                  },
                ],
                score_mode: 'first',
                boost_mode: 'replace',
                max_boost: 20.0,
                boost: 1.0,
              },
            },
            {
              function_score: {
                query: {
                  match_all: {
                    boost: 1.0,
                  },
                },
                functions: [
                  {
                    filter: {
                      match_all: {
                        boost: 1.0,
                      },
                    },
                    weight: 3.0,
                    field_value_factor: {
                      field: 'population',
                      factor: 1.0,
                      missing: 1.0,
                      modifier: 'log1p',
                    },
                  },
                ],
                score_mode: 'first',
                boost_mode: 'replace',
                max_boost: 20.0,
                boost: 1.0,
              },
            },
            {
              function_score: {
                query: {
                  match_all: {
                    boost: 1.0,
                  },
                },
                functions: [
                  {
                    filter: {
                      match: {
                        source: {
                          query: 'campings.com',
                          operator: 'OR',
                          prefix_length: 0,
                          max_expansions: 50,
                          fuzzy_transpositions: true,
                          lenient: false,
                          zero_terms_query: 'NONE',
                          auto_generate_synonyms_phrase_query: true,
                          boost: 1.0,
                        },
                      },
                    },
                    weight: 5.0,
                  },
                  {
                    filter: {
                      match: {
                        source: {
                          query: 'whosonfirst',
                          operator: 'OR',
                          prefix_length: 0,
                          max_expansions: 50,
                          fuzzy_transpositions: true,
                          lenient: false,
                          zero_terms_query: 'NONE',
                          auto_generate_synonyms_phrase_query: true,
                          boost: 1.0,
                        },
                      },
                    },
                    weight: 3.0,
                  },
                  {
                    filter: {
                      match: {
                        source: {
                          query: 'geonames',
                          operator: 'OR',
                          prefix_length: 0,
                          max_expansions: 50,
                          fuzzy_transpositions: true,
                          lenient: false,
                          zero_terms_query: 'NONE',
                          auto_generate_synonyms_phrase_query: true,
                          boost: 1.0,
                        },
                      },
                    },
                    weight: 1.0,
                  },
                  {
                    filter: {
                      match: {
                        source: {
                          query: 'openstreetmap',
                          operator: 'OR',
                          prefix_length: 0,
                          max_expansions: 50,
                          fuzzy_transpositions: true,
                          lenient: false,
                          zero_terms_query: 'NONE',
                          auto_generate_synonyms_phrase_query: true,
                          boost: 1.0,
                        },
                      },
                    },
                    weight: 0.0,
                  },
                ],
                score_mode: 'sum',
                boost_mode: 'multiply',
                max_boost: 50.0,
                min_score: 1.0,
                boost: 5.0,
              },
            },
          ],
          adjust_pure_negative: true,
          boost: 1.0,
        },
      },
      sort: [
        {
          _score: {
            order: 'desc',
          },
        },
      ],
      track_scores: true,
    },
  };
}

module.exports = generateQuery;
