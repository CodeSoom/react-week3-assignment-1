import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('when has no tasks', () => {
    it('renders empty message', () => {
      const tasks = [];

      const handleChange = jest.fn();
      const handleClickAddTask = jest.fn();
      const handleClickDeleteTask = jest.fn();

      const { container } = render((
        <Page
          tasks={tasks}
          onChangeTitle={handleChange}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(handleChange).not.toBeCalled();
      expect(handleClickAddTask).not.toBeCalled();
      expect(handleClickDeleteTask).not.toBeCalled();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  context('When has tasks', () => {
    it('renders List component', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기 1',
        },
        {
          id: 2,
          title: '뭐라도 하기 2',
        },
      ];

      const handleChange = jest.fn();
      const handleClickAddTask = jest.fn();
      const handleClickDeleteTask = jest.fn();

      const { container, getByText, getAllByText } = render((
        <Page
          tasks={tasks}
          onChangeTitle={handleChange}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(handleChange).not.toBeCalled();
      expect(handleClickAddTask).not.toBeCalled();
      expect(handleClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('뭐라도 하기 1'));
      fireEvent.click(getByText('뭐라도 하기 2'));

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
        fireEvent.click(getByText(title));
      });

      fireEvent.click(getAllByText('완료')[0]);
      fireEvent.click(getAllByText('완료')[1]);

      tasks.forEach(({ title }, index) => {
        expect(container).toHaveTextContent(title);
        fireEvent.click(getAllByText('완료')[index]);
      });

      tasks.forEach(({ title }) => {
        expect(container).not.toHaveTextContent(title);
      });
    });
  });
});
