import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  const value = 'hello';

  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText } = render((
    <Input
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  it("Input앞 '할 일' 출력 ", () => {
    expect(container).toHaveTextContent('할 일');
  });

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();
});
