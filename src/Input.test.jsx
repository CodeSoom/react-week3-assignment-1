import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const taskTitle = '안녕';

  const renderInput = () => render(
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />,
  );

  it('input-title을 렌더링한다', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('할 일');
  });

  it('input-button을 렌더링한다', () => {
    const { container } = renderInput();

    expect(container).toHaveTextContent('추가');
  });

  it('change 이벤트를 listen 한다', () => {
    const { getByPlaceholderText } = renderInput();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: { value: taskTitle },
    });

    expect(getByPlaceholderText('할 일을 입력해 주세요').value).toBe('안녕');
  });
});
