import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

test('List', () => {
  const task = {
    id: 1,
    title: '어쩌구저쩌구',
  };  

  const handleClick = jest.fn();

  const { container, getByText } = render((
    <List
      tasks={task}
      onClickDelete={handleClick}
    />
  ));

  expect(container).toHaveTextContent('어쩌구저쩌구');

  expect(handleClick).not.toBeCalled();

  fireEvent.click(getByText('완료'));

  expect(handleClick).toBeCalledWith(1);
});
