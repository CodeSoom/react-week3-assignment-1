import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const renderInput = (value) => render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  test('할 일이 표시 되어야 한다.', () => {
    const value = '과제하기';
    const { container } = renderInput(value);
    expect(container).toHaveTextContent('할 일');
  });

  context('추가 버튼을 누르면', () => {
    it('task가 handleClick 함수로 전달되어 호출되어야 한다.', () => {
      const value = '과제하기';
      const { getByText } = renderInput(value);
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalled();
    });
  });

  context('input 타이핑을 하면', () => {
    it('타이핑한 내용이 input에 표시되어야 한다.', () => {
      const value = '과제하기';
      const { container } = renderInput(value);
      expect(handleChange).not.toBeCalled();
      fireEvent.change(container.querySelector('input'), { target: { value } });
      expect(handleClick).toBeCalled();
    });
  });
});
