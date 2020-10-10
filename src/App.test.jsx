import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  context('초기 화면이 렌더링 되었을 때', () => {
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

  context('input 값이 변경되었을 때', () => {
    it('input 값이 바뀌었는지 확인', () => {
      const { getByLabelText } = renderApp();

      const inputTaskTitle = getByLabelText('할 일');

      fireEvent.change(inputTaskTitle, { target: { value: '할일1' } });

      expect(inputTaskTitle).toHaveValue('할일1');
    });
  });

  context('추가 버튼이 클릭 되었을 때', () => {
    const handleList = (list) => jest.fn().mockReturnValue(list);

    it('리스트에 할일 목록 추가됨', () => {
      const { getByText, getByLabelText } = renderApp();

      const tasks = [];
      const task = { id: 1, title: '할일1' };

      const input = getByLabelText('할 일');

      const addButton = getByText('추가');

      fireEvent.change(input, { target: { value: `${task.title}` } });

      expect(input.value).toEqual(task.title);

      fireEvent.click(addButton);

      expect(input.value).toEqual('');

      tasks.concat(handleList(task));

      tasks.forEach(({ title }) => {
        expect(title).toHaveTextContent(title);
      });
    });
  });

  context('"완료" button 클릭했을 때', () => {
    it('리스트 목록 삭제됨', () => {
      const { getByLabelText, getByText } = renderApp();

      const tasks = [
        {
          id: 1,
          title: '할일1',
        },
      ];

      const task = { id: 2, title: '할일2' };

      const input = getByLabelText('할 일');

      const addButton = getByText('추가');

      fireEvent.change(input, { target: { value: `${task.title}` } });

      expect(input.value).toEqual(task.title);

      fireEvent.click(addButton);

      tasks.concat(task);

      const deleteButton = getByText('완료');

      fireEvent.click(deleteButton);

      tasks.filter(({ id }) => id !== task.id);
    });
  });
});
