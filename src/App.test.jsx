import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';

import App from './App';

function setup() {
  render(<App />);
  const changeInput = (text) => fireEvent.change(screen.getByLabelText(/할 일/i, { selector: 'input' }),
    { target: { value: text } });
  const clickAddButton = () => fireEvent.click(screen.getByRole('button', { name: /추가/i }));
  const clickDoneButton = () => fireEvent.click(screen.getAllByRole('button', { name: /완료/i })[0]);
  return { changeInput, clickAddButton, clickDoneButton };
}

test('아무런 To-do가 등록되어 있지 않으면 "할 일이 없어요!"라는 메시지가 보인다', () => {
  setup();
  expect(screen.getByText('할 일이 없어요!')).toBeInTheDocument();
});

test('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보인다', () => {
  const { changeInput, clickAddButton } = setup();
  changeInput('아무것도 하지 않기');
  clickAddButton();
  expect(screen.getByText('아무것도 하지 않기')).toBeInTheDocument();
});

test('할 일을 입력하고 추가를 누르면 input의 텍스트가 지워진다', () => {
  const { changeInput, clickAddButton } = setup();
  changeInput('아무것도 하지 않기');
  clickAddButton();
  const inputElement = screen.getByLabelText(/할 일/i, { selector: 'input' });
  expect(inputElement.value).toBe('');
});

test('할 일을 완료하면 할 일이 목록에서 보이지 않는다', () => {
  const tasks = ['코드숨 과제하기', '아무것도 하지 않기'];
  const { changeInput, clickAddButton, clickDoneButton } = setup();

  tasks.forEach((task) => {
    changeInput(task);
    clickAddButton();
  });

  tasks.forEach(() => clickDoneButton());
  tasks.forEach((task) => expect(screen.queryByText(task)).not.toBeInTheDocument());
});
