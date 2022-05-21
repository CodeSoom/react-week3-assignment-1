import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

test('Input', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  const { container, getByText, getByRole } = render(
    <Input
      onClick={handleClick}
      onChange={handleChange}
    />,
  );

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');

  const input = getByRole('textbox');

  fireEvent.change(input, { target: { value: '코드숨 과제하기' } });

  expect(input.value).toBe('코드숨 과제하기');

  fireEvent.click(getByText('추가'));

  expect(handleClick).toBeCalled();
});
