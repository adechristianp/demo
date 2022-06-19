import reducer,
{
  addCollection,
  addAnime,
  editCollection,
  editAnimeCollection
} from './collection.slice';

describe('Collection slice test', () => {
  it('return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      collectionList: [],
      animeCollection: []
    });
  });

  it('handle a collection being added', () => {
    const payload = {
      id: 123,
      name: 'collection 1'
    };
    const previousState = {
      collectionList: [],
      animeCollection: []
    };
    const expectedResult = {
      collectionList: [{
        id: 123,
        name: 'collection 1'
      }],
      animeCollection: []
    }

    const state = reducer(previousState, addCollection(payload))

    expect(state).toEqual(expectedResult)
  });

  it('handle a collection being edited', () => {
    const payload = [{
      id: 124,
      name: 'collection 2'
    }];
    const previousState = {
      collectionList: [
        {
          id: 123,
          name: 'collection 1'
        },
        {
          id: 124,
          name: 'collection 2'
        }
      ],
      animeCollection: []
    };
    const expectedResult = {
      collectionList: [{
        id: 124,
        name: 'collection 2'
      }],
      animeCollection: []
    }

    const state = reducer(previousState, editCollection(payload))

    expect(state).toEqual(expectedResult)
  });

  it('handle a anime being added', () => {
    const payload = [{
      id: 123,
      collectionId: 11,
      averageScore: 80,
      title: {
        romaji: 'title'
      },
      coverImage: {
        large: 'img.png'
      }
    }];
    const previousState = {
      collectionList: [],
      animeCollection: []
    };
    const expectedResult = {
      collectionList: [],
      animeCollection: [...payload]
    }

    const state = reducer(previousState, addAnime(payload))

    expect(state).toEqual(expectedResult)
  });

  it('handle a anime being edited', () => {
    const payload = [
      {
        id: 123,
        collectionId: 11,
        averageScore: 80,
        title: {
          romaji: 'title'
        },
        coverImage: {
          large: 'img.png'
        }
      }
    ];
    const previousState = {
      collectionList: [],
      animeCollection: [
        {
          id: 123,
          collectionId: 11,
          averageScore: 80,
          title: {
            romaji: 'title'
          },
          coverImage: {
            large: 'img.png'
          }
        },
        {
          id: 124,
          collectionId: 11,
          averageScore: 80,
          title: {
            romaji: 'title2'
          },
          coverImage: {
            large: 'img.png'
          }
        }
      ]
    };
    const expectedResult = {
      collectionList: [],
      animeCollection: [...payload]
    }

    const state = reducer(previousState, editAnimeCollection(payload))

    expect(state).toEqual(expectedResult)
  })
});

