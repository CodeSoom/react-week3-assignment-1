import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByPlaceholderText, getByText } = render((
    <Input
      value=""
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  context('할 일을 입력하기', () => {
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    expect(handleChange).not.toBeCalled();

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });

    expect(container).toHaveTextContent('뭐라도 하기');
  });

  context('추가 버튼을 누르기', () => {
    const addeButton = getByText('추가');

    expect(handleClick).not.toBeCalled();

    fireEvent.click(addeButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
