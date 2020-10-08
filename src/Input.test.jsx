import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const taskTitle = {
    title: '아무것도 하지 않기',
  };

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClick}
    />
  ));

  expect(container).toHaveTextContent('할 일추가');
})

expect(handleClick).not.toBeCalled();

fireEvent.click(getByText('추가'));

expect(handleClick).toBeCalledWith(1);
