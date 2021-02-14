import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = '안녕';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();

  it('render input', () => {
    const { getByDisplayValue } = render((
      <Input
        value={taskTitle}
        onChange={handleChangeTitle}
        onClick={handleClickAddTask}
      />
    ));

    expect(getByDisplayValue('안녕')).not.toBeNull();
  });
});
