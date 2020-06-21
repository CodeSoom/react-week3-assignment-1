import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

import { TASK_TITLE } from './Fixtures/Tasks';
import { PLACEHOLDER, ADDTASK_TEXT, COMPLETE_TEXT } from './Fixtures/UserInterfaceText';

describe('<App /> ', () => {
  context('할 일을 입력하면', () => {
    it('input value가 변한다.', () => {
      const { getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText(PLACEHOLDER);

      // value를 수정한다.
      fireEvent.change(input, {
        target: {
          value: TASK_TITLE,
        },
      });
      expect(input.value).toBe(TASK_TITLE);
    });
  });

  context('추가 버튼을 누르면', () => {
    it('TASK가 추가되고 value는 공백으로 바뀐다.', () => {
      const { container, getByText, getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText(PLACEHOLDER);

      // value를 수정한다.
      fireEvent.change(input, {
        target: {
          value: TASK_TITLE,
        },
      });
      // 추가 버튼을 누른다.
      fireEvent.click(getByText(ADDTASK_TEXT));
      // 할 일 목록이 추가된다.
      expect(container).toHaveTextContent(TASK_TITLE);
      expect(input.value).toBe('');
    });
  });

  context('완료 버튼을 누르면', () => {
    it('할 일이 삭제된다.', () => {
      const { getByText, getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText(PLACEHOLDER);

      // value를 수정한다.
      fireEvent.change(input, {
        target: {
          value: TASK_TITLE,
        },
      });
      // 추가 버튼을 누른다.
      fireEvent.click(getByText(ADDTASK_TEXT));

      const task = getByText(TASK_TITLE);
      const removeButton = getByText(COMPLETE_TEXT);
      // 완료 버튼을 클릭하면
      fireEvent.click(removeButton);
      // 페이지에서 사라진다.
      expect(task).not.toBeInTheDocument();
    });
  });
});
