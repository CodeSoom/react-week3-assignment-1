import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handleChangeTitle를 실행 시, taskTitle 값이 set 된다.', () => {
    const { getByText } = render(<App />);
    fireEvent.change(getByText(/할 일/i), { target: { value: '회사출근' } });
    expect(setState).toHaveBeenCalledWith({ taskTitle: '회사출근' });
  });

  it('handleClickAddTask를 실행 시, task가 tasks에 추가 된다.', () => {
    const { getByText } = render(<App />);
    fireEvent.click(getByText(/추가/i));
    expect(setState).toHaveBeenCalledTimes(1);
  });

  it('handleClickDeleteTask를 실행 시, 넘어온 id의 task가 제거된다.', () => {
    const { getByText } = render(<App />, { newId: 101, tasks: [{ id: 100, title: '테스트하기' }] });
    fireEvent.click(getByText(/완료/i));
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
