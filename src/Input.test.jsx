import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const value = '테스트';

  const { container } = render ((
    <Input value={value} />
  ));

  expect(container).toHaveTextContent('테스트');

})