import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  context('tasks안에 task가 존재하지 않으면', () => {
    const tasks = [];

    it('할 일이 없어요! 메세지만 노출한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={handleClickDelete} />
      ));

      expect(container).not.toContainHTML('ol');
      expect(container).not.toContainHTML('li');

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('tasks안에 task가 하나라도 존재한다면', () => {
    const tasks = [
      {
        id: 1,
        title: '할 일 하나',
      },
      {
        id: 2,
        title: '할 일 두울',
      },
    ];

    it('tasks 목록을 출력한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={handleClickDelete} />
      ));

      expect(container).toContainHTML('ol');
      expect(container).toContainHTML('li');

      expect(container).toHaveTextContent('할 일 하나');
      expect(container).toHaveTextContent('할 일 두울');
      expect(container).toHaveTextContent('완료');
    });
  });
});
