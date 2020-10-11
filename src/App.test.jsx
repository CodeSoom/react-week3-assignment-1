import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('추가 버튼을 클릭하면', () => {
    it('목록이 추가된다', () => {
      const taskTitle = '테스트 코드 작성';

      const handleClickAddTask = jest.fn();
      const handleChangeTitle = jest.fn();

      beforeEach(() => {
        jest.clearAllMocks();
      });

      const { container, getByText, getByPlaceholderText } = render(
        <App
          taskTitle={taskTitle}
          handleChangeTitle={handleChangeTitle}
          handleClickAddTask={handleClickAddTask}
        />,
      );

      fireEvent.change(
        getByPlaceholderText('할 일을 입력해 주세요'),
        { target: { value: '테스트 코드 작성' } },
      );

      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent(taskTitle);
    });
  });

  context('input 값을 변경하면', () => {
    it('input 값이 변경된다', () => {
      const { getByPlaceholderText } = render(<App />);
      const task = '테스트 코드 작성';

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, { target: { value: task } });

      expect(input).toHaveValue(task);
    });
  });

  context('완료 버튼을 누르면', () => {
    it('task가 지워진다', () => {
      const { container, getByPlaceholderText, getByText } = render(<App />);
      const task = '테스트 코드 작성';

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: task } });

      const addBtn = getByText('추가');
      fireEvent.click(addBtn);

      expect(container).toHaveTextContent(task);

      const delBtn = getByText('완료');
      fireEvent.click(delBtn);

      expect(container).not.toHaveTextContent(task);
    });
  });
});
