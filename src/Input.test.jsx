import React from 'react';

import { render } from '@testing-library/react';

import Input from "./Input";

test('add Todo', () => {
  const { container } = render(
    <Input />
  );

  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
});