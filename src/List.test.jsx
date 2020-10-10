import { getByText, render } from '@testing-library/react';
import React from 'react';

import List from './List';



test('List', () => {

  const tasks = [];

  const task = {
    id: 1,
    title: '뭐라도 하기',
  };

  const { container } = render((
    <List tasks={tasks} />
  ));
  
  expect(container).toHaveTextContent('할 일이 없어요!');   
  //task.length가 0일 때 할일이 없어요가 나오는지

  tasks.push(task);

  expect(container).toHaveTextContent('뭐라도 하기');   


});