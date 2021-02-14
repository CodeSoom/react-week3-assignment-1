import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  it('render input', () => {
    render((
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));
  });
});
