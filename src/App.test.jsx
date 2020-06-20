import React from 'react';

import { render } from '@testing-library/react';

import App from './App';

test('App', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { container } = render((
    <App />
  ));

  expect(handleChangeTitle).not.toBeCalled();
  expect(handleClickAddTask).not.toBeCalled();
  expect(handleClickDeleteTask).not.toBeCalled();

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');
});
