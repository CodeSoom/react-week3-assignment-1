import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

test('List', () => {
  const tasks = [];

  const { getByText } = render(<List
    tasks={tasks}
  />);

  expect(getByText(/할 일이 없어요!/)).not.toBeNull();
});
