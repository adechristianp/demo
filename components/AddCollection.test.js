import { render, fireEvent } from "@testing-library/react";
import * as reactRedux from 'react-redux'
import AddCollection from "./AddCollection";

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));
jest.mock('./Snackbar', () => {
  const SnackbarComponent = () => <div />;
  return SnackbarComponent;
});
jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-01-01'));

describe('AddCollection component test', () => {
  let props;
  let wrapper;
  let input;
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    props = {
      collection: [
        {
          id: 1,
          name: 'coll 1'
        },
        {
          id: 2,
          name: 'coll 2'
        }
      ]
    };
    wrapper = render(<AddCollection {...props} />)
    input = wrapper.getByLabelText('collection-input').querySelector('input');
  });

  it('Should set input value without special character', () => {
    fireEvent.change(input, { target: { value: 'Action{}**' } });

    expect(input.value).toBe('Action')
  });

  it('Should call dispatch function on success add collection', () => {
    const expectedParams = {
      payload: {
        id: 1640995200000,
        name: "Coll 3"
      },
      type: "collections/addCollection"
    }
    const dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);

    fireEvent.change(input, { target: { value: 'Coll 3' } });
    fireEvent.click(wrapper.getByLabelText('collection-submit'));

    expect(dispatch).toHaveBeenCalledWith(expectedParams)
  });
});