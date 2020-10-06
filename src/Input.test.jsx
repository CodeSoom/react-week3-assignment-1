import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const taskTitle = {
    title: '아무것도 하지 않기',
  };

  const { container } = render((
    <Input value={taskTitle} />
  ));

  expect(container).toHaveTextContent('아무것도 하지 않기');
});
