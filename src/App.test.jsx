import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const { getByText, getByPlaceholderText } = render((
    <App />
  ));
  it('input 입력시 input이 업데이트 된다.', () => {
    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: 'TDD 과제하기' } });
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('TDD 과제하기');
  });

  it('추가버튼을 누르면 onClickAddTask가 실행된다.', () => {
    expect(onClickAddTask).not.toBeCalled();
    fireEvent.click(getByText('추가'));
    expect(onClickAddTask).toBeCalled();
  });

  it('완료버튼을 누르면 onClickDeleteTask가 실행된다.', () => {
    expect(onClickDeleteTask).not.toBeCalled();
    fireEvent.click(getByText('완료'));
    expect(onClickDeleteTask).toBeCalled();
  });
});
