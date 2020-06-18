import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('render가 잘 되었다면', () => {
    it(' "To-do", "할 일", "추가", "할 일이 없어요!" 문구가 보인다.', () => {
      const { container } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일');
      expect(container).toHaveTextContent('추가');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
