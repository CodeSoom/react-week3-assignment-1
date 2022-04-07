import {
  render, fireEvent,
} from '@testing-library/react';

import Input from './Input';

const handleChangeTitle = jest.fn();
const handleClickAddTask = jest.fn();

describe('Input', () => {
  it('renders input element', () => {
    const { getByPlaceholderText } = render((
      <Input
        value=""
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to change in input', () => {
    const { container, getByPlaceholderText } = render((
      <Input
        value=""
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/i);

    fireEvent.change(container, { target: { value: '코딩을 즐기기' } });

    expect(container).toEqual('코딩을 즐기기');
    // TODO : 코딩을 즐기기로 값을 바꿔주기.
  });

  it('추가 버튼을 클릭하면 input이 비어진다. ', () => {
    const { getByText, getByPlaceholderText } = render((
      <Input
        value=""
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));

    fireEvent.click(getByText('추가'));

    expect(handleChangeTitle).toBeCalled();
    expect(getByPlaceholderText(/할 일을 입력해 주세요/i)).toEqual('');
  });

  it('has 할 일 text.', () => {
    const { container } = render((
      <Input />
    ));

    expect(container).toHaveTextContent('할 일');
  });
});
