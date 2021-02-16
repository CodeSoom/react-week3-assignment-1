import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('할 일이 없는 경우', () => {
    const tasks = [];
    const deleteClickHandler = jest.fn();

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = render((
        <List tasks={tasks} onClickDelete={deleteClickHandler} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할일이 있는 경우', () => {
    const tasks = [{ id: 1, title: '할일1' }, { id: 2, title: '할일2' }];
    const deleteClickHandler = jest.fn();

    it('할일을 모두 표시한다.', () => {
      const { container, getAllByText } = render((
        <List tasks={tasks} onClickDelete={deleteClickHandler} />
      ));

      expect(container).toHaveTextContent('할일1');
      expect(container).toHaveTextContent('할일2');

      getAllByText('완료').forEach((v) => {
        fireEvent.click(v);
        expect(deleteClickHandler).toBeCalled();
      });
    });
  });
});
