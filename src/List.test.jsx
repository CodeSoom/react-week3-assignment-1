import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('when has no tasks', () => {
    it('renders empty message', () => {
      const tasks = [];
      const handleClickDelete = jest.fn();

      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(handleClickDelete).not.toBeCalled();

      // [v] TODO: '할 일이 없어요!' 출력이 되는지 테스트
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  context('when has tasks', () => {
    it('renders task lists', () => {
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
      const handleClickDelete = jest.fn();

      const { container, getByText, getAllByText } = render((
      // const { container, getByText } = render((

        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(handleClickDelete).not.toBeCalled();

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
        fireEvent.click(getByText(title));
      });

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
