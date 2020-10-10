import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  context('랜더링 되면', () => {
    it('To-do를 표시한다', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('To-do');
    });

    it('label, 버튼, placeholder를 표시한다', () => {
      const { getByText, getByPlaceholderText } = renderApp();

      expect(getByText('할 일')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });

  context('tasks가 없을 때', () => {
    it('빈 메시지를 표시한다', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 추가하면', () => {
    it('할일 목록을 표시한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '생각하기' },
      ];

      const { getByLabelText, getByText, getAllByRole } = renderApp();

      const input = getByLabelText('할 일');

      tasks.forEach(({ title }) => {
        fireEvent.change(input, { target: { value: title } });
        fireEvent.click(getByText('추가'));
      });

      const taskItems = getAllByRole('listitem');

      taskItems.forEach((taskItem, index) => {
        expect(taskItem).toHaveTextContent(tasks[index].title);
      });
    });
  });

  context('tasks를 삭제하면', () => {
    it('할일 목록을 제거한다', () => {
      const tasks = [
        { id: 1, title: '운동하기' },
        { id: 2, title: '생각하기' },
      ];

      const {
        getByLabelText, getByText, getAllByText, container,
      } = renderApp();

      const input = getByLabelText('할 일');

      tasks.forEach(({ title }) => {
        fireEvent.change(input, { target: { value: title } });
        fireEvent.click(getByText('추가'));
      });

      const buttons = getAllByText('완료');

      buttons.forEach((button) => {
        fireEvent.click(button);
      });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
