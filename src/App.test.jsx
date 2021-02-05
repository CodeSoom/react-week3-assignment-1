import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => {
    const queries = render(
      (<App />),
    );
    const input = queries.getByPlaceholderText('할 일을 입력해 주세요');
    const button = queries.getByRole('button');
    return {
      ...queries, input, button,
    };
  };
  context('1. input에 글자를 입력할 때', () => {
    it('input value 가 변화되어야 함', () => {
      const { input } = renderApp();

      expect(input).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'test code 작성하기' } });

      expect(input.value).toBe('test code 작성하기');
    });
  });

  context('2. 추가버튼을 클릭했을 때', () => {
    it('할일 목록에 새로운 할일이 추가되어야 함', () => {
      const {
        input, button, getByText, getAllByRole, queryByText,
      } = renderApp();

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'test code 작성하기' } });
      fireEvent.click(button);
      const todoList = getAllByRole('listitem');

      expect(queryByText('할 일이 없어요!')).not.toBeInTheDocument();
      expect(todoList[0]).toHaveTextContent('test code 작성하기');
    });
  });

  context('3. 완료버튼을 클릭했을 때', () => {
    it('할일목록에서 해당 할일이 제거되어야 함', () => {
      const {
        input, button, getByText, getAllByRole, queryByText, getAllByText,
      } = renderApp();

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
      expect(button).toBeInTheDocument();

      fireEvent.change(input, { target: { value: '출근하기' } });
      fireEvent.click(button);
      fireEvent.change(input, { target: { value: '퇴근하기' } });
      fireEvent.click(button);
      const beforTodoList = getAllByRole('listitem');

      expect(queryByText('할 일이 없어요!')).not.toBeInTheDocument();
      expect(beforTodoList[0]).toHaveTextContent('출근하기');
      expect(beforTodoList[1]).toHaveTextContent('퇴근하기');

      const completeButton = getAllByText('완료', { selector: 'button' });

      expect(completeButton[0]).toBeInTheDocument();

      fireEvent.click(completeButton[0]);
      const afterTodoList = getAllByRole('listitem');

      expect(afterTodoList.length).toBe(1);
      expect(queryByText('출근하기')).not.toBeInTheDocument();
    });
  });
});
