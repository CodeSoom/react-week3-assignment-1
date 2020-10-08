import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List 컴포넌트', () => {
  const handleClickDelete = jest.fn();

  context('tasks에 값이 있으면', () => {
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
      {
        id: 2,
        title: '할일2',
      },
      {
        id: 3,
        title: '할일3',
      },
    ];

    it('할 일들, 완료버튼들을 보여준다', () => {
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(container).toHaveTextContent('할일1');
      expect(container).toHaveTextContent('완료');

      expect(container).toHaveTextContent('할일2');
      expect(container).toHaveTextContent('완료');

      expect(container).toHaveTextContent('할일3');
      expect(container).toHaveTextContent('완료');
    });

    it('완료버튼들이 잘 호출된다', () => {
      const { getAllByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(handleClickDelete).not.toBeCalled();

      getAllByText('완료').forEach((complete) => {
        fireEvent.click(complete);
      });

      expect(handleClickDelete).toBeCalledWith(3);
    });
  });

  context('tasks에 값이 없으면', () => {
    const tasks = [];

    it('할 일이 없어요! 를 보여준다', () => {
      const { container } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDelete}
        />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
