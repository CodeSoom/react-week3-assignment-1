import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

describe('List Component', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks = []) => render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  context('when empty tasks', () => {
    it('show default text', () => {
      const defaultText = '할 일이 없어요!';
      const { getByText } = renderList();

      expect(getByText(defaultText)).toBeInTheDocument();
    });
  });

  context('with not empty tasks', () => {
    const givenTasks = [
      {
        id: 1,
        title: '밥먹기',
      },
      {
        id: 2,
        title: '빨래하기',
      },
      {
        id: 3,
        title: '청소하기',
      },
    ];
    it('show information of tasks', () => {
      const { getByText } = renderList(givenTasks);

      givenTasks.forEach(({ title }) => {
        expect(getByText(title)).toBeInTheDocument();
      });
    });
  });

  context('with invalid tasks type', () => {
    it('show error message', () => {
      const { getByText } = renderList('invalid');

      expect(getByText('오류가 발생했습니다')).toBeInTheDocument();
    });
  });
});
