import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  // props
  const taskTitle = '할일!';

  // events
  const handleChangeTitle = jest.fn();
  const handleClick = jest.fn();

  // element
  const renderElement = () => render(
    <Input
      value={taskTitle}
      onChange={handleChangeTitle}
      onClick={handleClick}
    />,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('value를 렌더링한다.', () => {
    const { getByPlaceholderText } = renderElement();
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(inputElement.value).toBe('할일!');
  });

  it('value에 값을 넣으면, handleChange가 실행된다.', () => {
    const { getByPlaceholderText } = renderElement();
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(handleChangeTitle).not.toBeCalled();
    fireEvent.change(inputElement, { target: { value: '할일 테스트!' } });
    expect(handleChangeTitle).toBeCalled();
  });

  it('추가 버튼을 누르면, handleClick가 실행된다.', () => {
    const { getByText } = renderElement();
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
