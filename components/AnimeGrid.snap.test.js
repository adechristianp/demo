import renderer from 'react-test-renderer';
import AnimeGrid from './AnimeGrid';

jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  }
});

describe('AnimeGrid Component Snapshot', () => {
  it('Renders AnimeGrid component', () => {
    const props = {
      animeList: [],
      withRemove: false,
      withChecked: false,
      checkedList: [],
      handleRemove: jest.fn(),
      handleCheck: jest.fn(),
      loading: false
    };

    const tree = renderer
      .create(<AnimeGrid {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AnimeGrid skeleton loader component', () => {
    const props = {
      loading: true,
    };

    const tree = renderer
      .create(<AnimeGrid {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AnimeGrid with 2 anime content', () => {
    const props = {
      animeList: [
        {
          id: 1,
          title: {
            romaji: 'anime 1',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png'
          },
          averageScore: 90
        },
        {
          id: 2,
          title: {
            romaji: 'anime 2',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png'
          },
          averageScore: 90
        }
      ],
    };

    const tree = renderer
      .create(<AnimeGrid {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AnimeGrid with remove icon', () => {
    const props = {
      animeList: [
        {
          id: 1,
          title: {
            romaji: 'anime 1',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png'
          },
          averageScore: 90
        }
      ],
      withRemove: true,
      handleRemove: jest.fn()
    };

    const tree = renderer
      .create(<AnimeGrid {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AnimeGrid with checklist icon', () => {
    const props = {
      animeList: [
        {
          id: 1,
          title: {
            romaji: 'anime 1',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx15-A4F2t0TgWoi4.png'
          },
          averageScore: 90
        }
      ],
      withChecked: true,
      handleCheck: jest.fn()
    };

    const tree = renderer
      .create(<AnimeGrid {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
