import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const appRender = () => render((<App />));

  context('when initial state', () => {
    it('show placeholder', () => {
      const { container, getByPlaceholderText } = appRender();

      expect(container).toHaveTextContent('To-do');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
    });

    it('show "할 일이 없어요!"', () => {
      const { container } = appRender();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('When entering text', () => {
    it('show text in inputbox', () => {
      const { getByPlaceholderText } = appRender();
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(input).toHaveValue('');
      fireEvent.change(input, { target: { value: '입력한 문자' } });
      expect(input).toHaveValue('입력한 문자');
    });
  });

  context('when clicking "추가" button', () => {
    it('add task to tasks', () => {
      const tasks = [
        { id: 1, title: '첫번째 할 일' },
        { id: 2, title: '두번째 할 일' },
        { id: 3, title: '세번째 할 일' },
      ];

      const { getByPlaceholderText, getByText, getAllByRole } = appRender();

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      tasks.forEach((task) => {
        fireEvent.change(input, { target: { value: task.title } });
        fireEvent.click(getByText('추가'));
      });

      getAllByRole('listitem').forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
      });
    });
  });

  context('when clicking "완료" button', () => {
    it('delete selected task from tasks', () => {
      const tasks = [
        { id: 1, title: '첫번째 할 일' },
        { id: 2, title: '두번째 할 일' },
        { id: 3, title: '세번째 할 일' },
      ];

      const {
        container,
        getByPlaceholderText,
        getByText,
        getAllByText,
      } = appRender();

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
