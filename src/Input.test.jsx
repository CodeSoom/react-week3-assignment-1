import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
    handleChange.mockClear();
  });

  it('Input을 렌더링 한다', () => {
    const taskTitle = '안녕';

    const { container, getByPlaceholderText } = render((
      <Input
        value={taskTitle}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: taskTitle } });

    expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe(taskTitle);
  });
});
