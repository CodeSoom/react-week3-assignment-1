import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

test('Page', () => {
  const tasks = [
    {
      title: 'Test value #1',
      id: 1,
    },
    {
      title: 'Test value #2',
      id: 2,
    },
  ];
  const onClick = jest.fn();
  const onChange = jest.fn();
  const onClickDelete = jest.fn();

  const { container } = render((
    <Page
      tasks={tasks}
      onClick={onClick}
      onChange={onChange}
      onClickDelete={onClickDelete}
    />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('Test value #1');
  expect(container).toHaveTextContent('Test value #2');
});
