import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('Input', () => {

  const value = 'input value test';
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input 
      value={value}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(screen.getByDisplayValue('input value test'));

  expect(container).toHaveTextContent('추가');

  expect(handleClick).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClick).toBeCalled();


});

