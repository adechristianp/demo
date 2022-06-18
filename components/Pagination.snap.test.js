import renderer from 'react-test-renderer';
import Pagination from './Pagination';

describe('Pagination Component Snapshot', () => {

  it('Renders Pagination component with 2 pages', () => {
    const props = {
      page: 1,
      count: 2,
      handlePageChange: jest.fn()
    };

    const tree = renderer
      .create(<Pagination {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Renders Pagination component with 10 pages', () => {
    const props = {
      page: 1,
      count: 10,
      handlePageChange: jest.fn()
    };

    const tree = renderer
      .create(<Pagination {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});