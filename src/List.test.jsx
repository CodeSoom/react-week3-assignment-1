import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

function renderList(tasks, onClickDelete) {
  return render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));
}

describe('List', () => {
  const onClickDelete = jest.fn();

  context('when there are no tasks', () => {
    const tasks = [];

    it('renders 할 일이 없어요!', () => {
      const { container } = renderList(tasks, onClickDelete);

      expect(container).toContainHTML('할 일이 없어요!');
    });
  });

  context('when there are tasks', () => {
    const tasks = [{
      id: 1,
      title: '쉬기',
    },
    {
      id: 2,
      title: '놀기',
    }];

    it('renders a list of tasks', () => {
      const { container } = renderList(tasks, onClickDelete);

      expect(container).toContainHTML('<ol');
      expect(container).toContainHTML('쉬기');
      expect(container).toContainHTML('놀기');
    });
  });
});
