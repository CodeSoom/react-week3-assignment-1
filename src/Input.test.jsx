import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input 컴포넌트 관련 테스트', () => {
  const value = '뭐라도 하기';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  it('할 일을 입력하면 입력값으로 변경되어야 한다', () => {
    const { getByPlaceholderText } = render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });

    expect(input).toHaveAttribute('value', '뭐라도 하기');
  });

  it('추가버튼을 클릭할 수 있다', () => {
    const { container, getByText } = render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));

    expect(container).toHaveTextContent('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));
  });
});
