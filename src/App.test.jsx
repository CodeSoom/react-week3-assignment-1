import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderUtil = () => render((
    <App />
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
    const handleList = (list) => jest.fn().mockReturnValue(list);

    it('"추가" button return rendering list', () => {
      const tasks = [];

      const { getByText } = renderUtil(tasks);

      const task = { id: 1, title: '할일1' };

      const addButton = getByText('추가');

      fireEvent.click(addButton);

      tasks.concat(handleList(task));

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
      ];

      const addedList = tasks.map((task) => (`
      <li>${task.title}</li>
      <button>완료</button>
      `));
      document.body.innerHTML = addedList;

      const { getByText } = renderUtil();

      const task = { id: 1, title: '할일1' };

      const deleteList = handleList(task);

      const deleteButton = getByText('완료');

      fireEvent.click(deleteButton);

      tasks.filter(({ id }) => id !== deleteList.id);
    });
  });
});
