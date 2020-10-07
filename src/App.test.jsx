import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('when initial state', () => {
    it('show placeholder', () => {
      const { container, getByPlaceholderText } = render((
        <App />
      ));

      expect(container).toHaveTextContent('To-do');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
    });

    it('show "할 일이 없어요!"', () => {
      const { container } = render((
        <App />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('when add 3 tasks', () => {
    it('show tasks list', () => {
      const tasks = [
        { id: 1, title: '첫번째 할 일' },
        { id: 2, title: '두번째 할 일' },
        { id: 3, title: '세번째 할 일' },
      ];

      const { getByPlaceholderText, getByText, getAllByRole } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      tasks.forEach((task) => {
        fireEvent.change(input, { target: { value: task.title } });
        fireEvent.click(getByText('추가'));
      });

      const taskTitles = getAllByRole('listitem');

      taskTitles.forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
      });
    });
  });

  context('when delete 3 tasks', () => {
    it('click delete button', () => {
      const tasks = [
        { id: 1, title: '첫번째 할 일' },
        { id: 2, title: '두번째 할 일' },
        { id: 3, title: '세번째 할 일' },
      ];

      const {
        container, getByPlaceholderText, getByText, getAllByText,
      } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      tasks.forEach((task) => {
        fireEvent.change(input, { target: { value: task.title } });
        fireEvent.click(getByText('추가'));
      });

      const firstbutton = getAllByText('완료');

      fireEvent.click(firstbutton[1]);
      expect(container).toHaveTextContent('첫번째 할 일');
      expect(container).not.toHaveTextContent('두번째 할 일');
      expect(container).toHaveTextContent('세번째 할 일');
      fireEvent.click(firstbutton[0]);
      expect(container).not.toHaveTextContent('첫번째 할 일');
      expect(container).not.toHaveTextContent('두번째 할 일');
      expect(container).toHaveTextContent('세번째 할 일');
      fireEvent.click(firstbutton[2]);
      expect(container).not.toHaveTextContent('첫번째 할 일');
      expect(container).not.toHaveTextContent('두번째 할 일');
      expect(container).not.toHaveTextContent('세번째 할 일');

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
