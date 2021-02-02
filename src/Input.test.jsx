import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const handleChangeTitle = jest.fn();

  const { getByLabelText } = render((
    <Input
      onChange={handleChangeTitle}
    />
  ));

  const input = getByLabelText('할 일');

  fireEvent.change(input, { target: { value: '뭐라도 하기' } });
  expect(input.value).toBe('뭐라도 하기');
});
