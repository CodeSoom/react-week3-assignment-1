import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render((
    <App />
  ));

  context('when rendering initial state', () => {
    it('input 이 있는지 확인', () => {
      const { getByLabelText } = renderApp();

      expect(getByLabelText('할 일')).toBeVisible();
    });

    it('할일이없어요 text가 있는지 확인', () => {
      const { getByText } = renderApp();

      expect(getByText('할 일이 없어요!')).toBeVisible();
    });

    it('input "추가" button 있는지 확인', () => {
      const { getByText } = renderApp();

      expect(getByText('추가')).toBeVisible();
    });
  });

  context('when click 추가 button', () => {
    const handleClick = jest.fn();
    const handleList = (list) => jest.fn().mockReturnValue(list);

    it('리스트에 할일 목록 추가됨', () => {
      const tasks = [];

      const { getByText } = renderApp();

      const task = { id: 1, title: '' };

      const addButton = getByText('추가');

      expect(handleClick).not.toBeCalled();

      fireEvent.click(addButton);

      expect(handleClick).toBeCalled();

      tasks.concat(handleList(task));

      tasks.forEach(({ title }) => {
        expect(title).toBe(title);
      });
    });

    it('"완료" button return delete list', () => {
      const { getByText } = renderApp();

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

      const task = { id: 1, title: '할일1' };

      const deleteList = handleList(task);

      const deleteButton = getByText('완료');

      fireEvent.click(deleteButton);

      tasks.filter(({ id }) => id !== deleteList.id);
    });
  });
});
