import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '안녕하세용';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText, getByPlaceholderText } = render((
    <Input
      value={value}
      onClick={handleClick}
      onChange={handleChange}
    />
  ));

  test('label에 "할 일" 문구가 나와야 한다.', () => {
    expect(container).toHaveTextContent('할 일');
  });

  context('추가 버튼을 누르면', () => {
    it('task가 handleClick 함수로 전달되어 호출되어야 한다.', () => {
      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClick).toBeCalledWith(value);
    });
  });

  context('input 타이핑을 하면', () => {
    it('타이핑한 내용이 input에 표시되어야 한다.', () => {
      expect(handleChange).not.toBeCalled();
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '타이핑' } });
      expect(handleChange).toBeCalledWith(value);
    });
  });
});
