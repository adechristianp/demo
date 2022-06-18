import renderer from 'react-test-renderer';
import AniToolBar from './AniToolBar';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      back: jest.fn()
    });
  },
}));

describe('AniToolbar Component Snapshot', () => {
  it('Renders AniToolbar with back button and title', () => {
    const props = {
      hasBackButton: true,
      title: 'Title'
    };

    const tree = renderer
      .create(<AniToolBar {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AniToolbar with title but without back button', () => {
    const props = {
      hasBackButton: false,
      title: 'Title'
    };

    const tree = renderer
      .create(<AniToolBar {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AniToolbar with back button but without title', () => {
    const props = {
      hasBackButton: true
    };

    const tree = renderer
      .create(<AniToolBar {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders AniToolbar without back button and title', () => {
    const props = {};

    const tree = renderer
      .create(<AniToolBar {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});