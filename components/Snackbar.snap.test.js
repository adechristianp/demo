import renderer from 'react-test-renderer';
import Snackbar from './Snackbar';

describe('Snackbar Component Snapshot', () => {
  it('Renders success snackbar component', () => {
    const props = {
      type: 'success',
      message: 'message',
      show: true,
      onDismiss: jest.fn()
    };

    // prevent Cannot read property 'scrollTop' of null scrollTop of null error
    const tree = renderer.act(() => {
      renderer.create(<Snackbar {...props} />, {
        createNodeMock: node => {
          return document.createElement(node.type);
        },
      });
    });
    expect(tree).toMatchSnapshot();
  });

  it('Renders error snackbar component', () => {
    const props = {
      type: 'error',
      message: 'message',
      show: true,
      onDismiss: jest.fn()
    };

    // prevent Cannot read property 'scrollTop' of null scrollTop of null error
    const tree = renderer.act(() => {
      renderer.create(<Snackbar {...props} />, {
        createNodeMock: node => {
          return document.createElement(node.type);
        },
      });
    });
    expect(tree).toMatchSnapshot();
  });

  it('Renders warning snackbar component', () => {
    const props = {
      type: 'warning',
      message: 'message',
      show: true,
      onDismiss: jest.fn()
    };

    // prevent Cannot read property 'scrollTop' of null scrollTop of null error
    const tree = renderer.act(() => {
      renderer.create(<Snackbar {...props} />, {
        createNodeMock: node => {
          return document.createElement(node.type);
        },
      });
    });
    expect(tree).toMatchSnapshot();
  });
});
