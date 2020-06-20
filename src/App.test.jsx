import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import App from './App';

function renderApp() {
  render(<App />);
  return {
    taskInput: screen.getByLabelText(/할 일/i, { selector: 'input' }),
    taskAddButton: screen.getByRole('button', { name: /추가/i }),
    getTaskDoneButtons: () => screen.queryAllByRole('button', { name: /완료/i }),
  };
}

test('아무런 To-do가 등록되어 있지 않으면 "할 일이 없어요!"라는 메시지가 보인다', () => {
  // when
  renderApp();
  // then
  expect(screen.getByText(/할 일이 없어요!/i)).toBeInTheDocument();
});

test('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보인다', () => {
  // when
  const { taskInput, taskAddButton } = renderApp();
  fireEvent.change(taskInput, { target: { value: '아무것도 하지 않기' } });
  fireEvent.click(taskAddButton);
  // then
  expect(screen.getByText('아무것도 하지 않기')).toBeInTheDocument();
});

test('할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다', () => {
  // when
  const { taskInput, taskAddButton } = renderApp();
  fireEvent.change(taskInput, { target: { value: '아무것도 하지 않기' } });
  fireEvent.click(taskAddButton);
  // then
  expect(taskInput.value).toBe('');
});

test('할 일을 완료하면 할 일이 목록에서 보이지 않는다', () => {
  // given
  const tasks = ['코드숨 과제하기', '아무것도 하지 않기'];
  // when
  const { taskInput, taskAddButton, getTaskDoneButtons } = renderApp();
  tasks.forEach((task) => {
    fireEvent.change(taskInput, { target: { value: task } });
    fireEvent.click(taskAddButton);
  });
  // then
  tasks.forEach(() => fireEvent.click(getTaskDoneButtons()[0]));
  tasks.forEach((task) => expect(screen.queryByText(task)).not.toBeInTheDocument());
});
