import renderer from 'react-test-renderer';
import AnimeDetailSkeleton from './AnimeDetailSkeleton';

jest.mock('./AniToolBar', () => 'AniToolBar');

describe('AnimeDetailSkeleton Component Snapshot', () => {
  it('Renders AnimeDetailSkeleton component input', () => {
    const tree = renderer
      .create(<AnimeDetailSkeleton />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
