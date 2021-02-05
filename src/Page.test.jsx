import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';


test('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const { container } = render((
    <Page 
      tasks = {[]}
    />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');

});
