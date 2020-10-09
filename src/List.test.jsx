import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('List Component', () => {
  const onClickDeleteTask = jest.fn();

  const init = ({
    tasks = [],
    onClickDelete = onClickDeleteTask,
  }) => {
    const utils = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
    return { ...utils };
  };

  context('Empty task', () => {
    const isEmptyTask = '할 일이 없어요!';

    it('test nothing to do notification', () => {
      const { container } = init({});
      expect(container).toHaveTextContent(isEmptyTask);
    });
  });

  context('Some tasks', () => {
    it('test only one to do item', () => {

    });

    it('test more than one to do items', () => {

    });
  });
});
