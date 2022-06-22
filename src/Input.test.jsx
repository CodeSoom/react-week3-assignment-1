import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  // props
  let taskTitle;

  // events
  let handleChangeTitle;
  let handleClick;

  // element
  let renderElement;

  const initializeTestProps = () => {
    taskTitle = '할일!';
    handleChangeTitle = jest.fn();
    handleClick = jest.fn();

    renderElement = render(
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClick}
      />,
    );
  };
  beforeEach(() => {
    initializeTestProps();
  });

  const clearMock = () => {
    taskTitle = '할일!';
    handleChangeTitle = jest.fn();
    handleClick = jest.fn();
  };
  afterEach(() => {
    clearMock();
  });

  test('Input 컴포넌트는 value를 렌더링한다.', () => {
    const { getByPlaceholderText } = renderElement;
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(inputElement.value).toBe('할일!');
  });

  test('Input 컴포넌트의 value에 값을 넣으면, handleChange가 실행된다.', () => {
    const { getByPlaceholderText } = renderElement;
    const inputElement = getByPlaceholderText('할 일을 입력해 주세요');
    expect(handleChangeTitle).not.toBeCalled();
    fireEvent.change(inputElement, { target: { value: '할일 테스트!' } });
    expect(handleChangeTitle).toBeCalled();
  });

  test('Input 컴포넌트의 추가 버튼을 누르면, handleClick가 실행된다.', () => {
    const { getByText } = renderElement;
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
