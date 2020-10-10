import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);
  const tasks = [
    '아무것도 안하기',
    '더욱 더 아무것도 안하기',
    '본격적으로 아무것도 안하기',
  ];

  it('"할 일이 없어요!" 확인', () => {
    const { getByText } = renderApp();

    getByText('할 일이 없어요!');
  });

  it('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보인다.', () => {
    const { getByRole, getByText } = renderApp();

    fireEvent.change(
      getByRole('textbox'),
      { target: { value: tasks[0] } },
    );
    fireEvent.click(getByText('추가'));

    getByText(tasks[0]);
  });

  it('할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다.', () => {
    const { getByRole, getByText } = renderApp();

    fireEvent.change(
      getByRole('textbox'),
      { target: { value: tasks[0] } },
    );
    fireEvent.click(getByText('추가'));

    expect(getByRole('textbox').value).toBe('');
  });

  it('할 일을 완료하면 할 일이 목록에서 보이지 않는다.', () => {
    const {
      getByRole, queryByText, getByText, getAllByText,
    } = renderApp();

    tasks.forEach((task) => {
      fireEvent.change(
        getByRole('textbox'),
        { target: { value: task } },
      );
      fireEvent.click(getByText('추가'));
    });

    getAllByText('완료').forEach((button) => {
      fireEvent.click(button);
    });

    tasks.forEach((task) => {
      expect(queryByText(task)).toBe(null);
    });
  });
});
