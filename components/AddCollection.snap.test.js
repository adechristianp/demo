import renderer from 'react-test-renderer';
import AddCollection from './AddCollection';

describe('AddCollection Component Snapshot', () => {
  it('Renders AddCollection component input', () => {
    const props = {
      open: true,
      onDismiss: jest.fn(),
      onSubmit: jest.fn(),
      title: 'Form Title',
      description: 'Form Desc'
    };

    const tree = renderer
      .create(<AddCollection {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
