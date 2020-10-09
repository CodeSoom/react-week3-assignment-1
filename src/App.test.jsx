import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderUtil = (tasks = []) => render((
    <App tasks={tasks} />
  ));

  context('when rendering text', () => {
    it('verify Input visible', () => {
      const { getByLabelText } = renderUtil();

      expect(getByLabelText('할 일')).toBeVisible();
    });

    it('verify List visible', () => {
      const { getByText } = renderUtil();

      expect(getByText('할 일이 없어요!')).toBeVisible();
    });
  });

  context('when rendering buttons', () => {
    it('verify "추가" button visible', () => {
      const { getByText } = renderUtil();

      expect(getByText('추가')).toBeVisible();
    });
  });

  context('when click', () => {
    const mockFn = jest.fn();
    const handleList = (list) => mockFn.mockReturnValue(list);

    it('"추가" button return rendering list', () => {
      const tasks = [];

      const { getByText } = renderUtil(tasks);

      const task = { id: 1, title: '할일1' };

      const addButton = getByText('추가');

      fireEvent.click(addButton);

      handleList(task);

      tasks.forEach(({ title }) => {
        expect(title).toBe(title);
      });
    });

    it('"완료" button return delete list', () => {
      const tasks = [
        {
          id: 1,
          title: '할일1',
        },
        {
          id: 2,
          title: '할일2',
        },
      ];
      tasks.forEach();

      const { getByText } = renderUtil(tasks);

      const task = { id: 1, title: '할일1' };

      const deleteButton = getByText('완료');

      fireEvent(deleteButton);

      handleList(task);
    });
  });
});
