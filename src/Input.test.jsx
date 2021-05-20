import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '';

  const onChange = jest.fn();
  const onClick = jest.fn();

  const { container, getByText} = render((
    <Input
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  ));

  expect(container).toHaveTextContent('할 일추가');

  expect(onChange).not.toBeCalled();  
  expect(onClick).not.toBeCalled();

  fireEvent.click(getByText('추가'));

});
  