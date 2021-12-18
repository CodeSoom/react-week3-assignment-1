import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const value = 'test';

  const InputComponent = () => render(
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />,
  );

  it('할 일을 그린다.', () => {
    const { container } = InputComponent();
    expect(container).toHaveTextContent('할 일');
  });

  it('추가 버튼 누르면 handleClick 작동한다.', () => {
    const { getByText } = InputComponent();
    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(handleClick).toBeCalled();
  });

  it('Input 컴포넌트의 프롭의 value가 input 태그의 value와 같다. ', () => {
    const { getByLabelText } = InputComponent();
    expect(getByLabelText('할 일').value).toBe(value);
  });

  it('textbox에 값이 입력될때 handleChange 작동된다.', () => {
    const { getByLabelText } = InputComponent();
    expect(handleChange).not.toBeCalled();
    fireEvent.change(getByLabelText('할 일'), {
      target: {
        value: 'test2',
      },
    });
    expect(handleChange).toBeCalled();
  });
});
