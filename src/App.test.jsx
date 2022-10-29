import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  /*  const tasks = [
    {
      id: 1,
      title: '넷플릭스 보기',
    },
    {
      id: 2,
      title: '아무것도 안하기',
    },
  ]; */

  const appContents = () => render((<App />));

  it('App 컴포넌트 랜더링이 된다', () => {
    const { container } = appContents();

    expect(container).toHaveTextContent(/To-do/);
    expect(container).toHaveTextContent(/할 일이 없어요!/);
    expect(container).toHaveTextContent(/추가/);
  });

  context('할 일이 있을 경우', () => {
    it('"완료"버튼이 랜더링된다', () => {
      const { getByLabelText, getByText, container } = appContents();

      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: '독서',
        },
      });

      const addTaskBtn = getByText('추가');

      fireEvent.click(addTaskBtn);

      expect(container).toHaveTextContent('독서');

      const deleteBtn = getByText('완료');

      fireEvent.click(deleteBtn);

      expect(container).not.toHaveTextContent('독서');
    });
  });

  context('할 일이 없을 경우', () => {
    it('할 일이 없어요! 글씨가 뜬다.', () => {
      const tasks = [];
      const { getByText } = appContents(tasks);

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });

    it('value가 입력되면 "추가" 버튼이 랜더링 된다', () => {
      const { getByLabelText, getByText, container } = appContents();
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: '할 일 추가',
        },
      });

      const addTaskBtn = getByText('추가');

      fireEvent.click(addTaskBtn);

      expect(container).toHaveTextContent('할 일 추가');
    });
  });
});
