import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((<App />));
  }

  it('App 컴포넌트 랜더링이 된다', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent(/To-do/);
    expect(container).toHaveTextContent(/할 일이 없어요!/);
    expect(container).toHaveTextContent(/추가/);
  });

  context('할 일이 있을 경우', () => {
    it('"완료"버튼이 랜더링된다', () => {
      const { getByLabelText, getByText, container } = renderApp();

      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: '독서',
        },
      });

      const addTaskBtn = getByText('추가');

      fireEvent.click(addTaskBtn);

      const deleteBtn = getByText('완료');

      fireEvent.click(deleteBtn);

      expect(container).not.toHaveTextContent('독서');
    });
  });

  context('할 일이 없을 경우', () => {
    it('할 일이 없어요! 글씨가 뜬다.', () => {
      const tasks = [];
      const { getByText } = renderApp(tasks);

      expect(getByText('할 일이 없어요!')).not.toBeNull();
    });

    it('value가 입력되면 handleChangeTitle함수가 실행된다.', () => {
      const { getByLabelText, getByText, container } = renderApp();
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
