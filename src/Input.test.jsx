import { fireEvent, render } from '@testing-library/react';
import Input from './Input';

test('Input', () => {
  const value = 'test';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByLabelText, getByText } = render(
    <Input value={value} onChange={handleChange} onClick={handleClick} />
  );

  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일');

  fireEvent.change(getByLabelText('할 일'), {
    target: { value: 'test' },
  });

  expect(container).toBeInTheDocument('test');

  fireEvent.click(getByText('추가'));
});
