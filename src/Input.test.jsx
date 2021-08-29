import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const task = {
    newId: 1,
    taskTitle: '할 일 1',
  };

  const { taskTitle } = task;

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  it('renders 할 일 and 추가 text content', () => {
    const { container } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('calls handleChange function', () => {
    const { getByPlaceholderText } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
    const inputField = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();
    fireEvent.change(inputField, { target: { value: 'a' } });
    expect(handleChange).toBeCalledTimes(1);
  });

  it('calls handleClick function', () => {
    const { getByText } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });
});
