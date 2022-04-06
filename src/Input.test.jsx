import {
  render, fireEvent,
} from '@testing-library/react';

import { act } from 'react-dom/test-utils';

import Input from './Input';

const handleChangeTitle = jest.fn();
const handleClickAddTask = jest.fn();

describe('AddInput', () => {
  it('render input element', async () => {
    const { getByPlaceholderText } = render(
      <Input
        value=""
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to change in input', async () => {
    const { container, getByPlaceholderText } = render(
      <Input
        value=""
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/i);
    fireEvent.change(inputElement, { target: { value: '코딩을 즐기기' } });
    // expect(inputElement.value).toEqual('코딩을 즐기기');
    // TODO : 코딩을 즐기기로 값을 바꿔주기.
  });

  it('추가 버튼을 클릭하면 input이 비어진다. ', async () => {
    const { container, getByText, getByPlaceholderText } = render(
      <Input
        value=""
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />,
    );

    await act(async () => {
      expect(container).toHaveTextContent('추가');
    });

    await act(async () => {
      fireEvent.click(getByText('추가'));
      expect(handleChangeTitle).toBeCalled();
      expect(getByPlaceholderText(/할 일을 입력해 주세요/i)).toEqual('');
    });
  });

  it('input의 왼쪽 글의 이름은 할 일 이다.', async () => {
    const { container } = render((
      <Input />
    ));

    expect(container).toHaveTextContent('할 일');
  });
});
