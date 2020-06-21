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

      const { getByText, getAllByText } = render((

        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(handleClickDelete).not.toBeCalled();

      fireEvent.click(getByText('뭐라도 하기 1'));
      fireEvent.click(getByText('뭐라도 하기 2'));

      tasks.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
        fireEvent.click(getByText(title));
      });

      fireEvent.click(getAllByText('완료')[0]);
      fireEvent.click(getAllByText('완료')[1]);

      tasks.forEach(({ title }, index) => {
        expect(getByText(title)).toBeInTheDocument();
        fireEvent.click(getAllByText('완료')[index]);
      });

      tasks.forEach(({ title }) => {
        expect(getByText(title)).not.toBeInTheDocument();
      });
    });
  });
});
