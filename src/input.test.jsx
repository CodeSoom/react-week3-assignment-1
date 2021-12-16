import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const todo = '할일1'
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input
        value={todo}
        onChange={handleChange}
        onClick={handleClick}
    />
  ));

  console.log(container);
  expect(container.value).toBe('');
  fireEvent.change(container, {target: {value: '할일1'}});
  expect(container.value).toBe('할일1');
 
  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(container.value).toBe('');
});
