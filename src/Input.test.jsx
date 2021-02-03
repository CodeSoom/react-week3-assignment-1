import React from 'react';

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const taskTitle = ''
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();

  render((
    <Input
      value={taskTitle}
      onChange={onChangeTitle}
      onClick={onClickAddTask}
    />
  ));

  it('UI 정상노출 확인', () => {

  });

});
