import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App /> ', () => {
  const TASK = '자바스크립트 공부하기';
  context('할 일을 입력하면', () => {
    it('input value가 변한다.', () => {
      const { getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      // value를 수정한다.
      fireEvent.change(input, {
        target: {
          value: '자바스크립트 공부하기',
        },
      });
      expect(input.value).toBe('자바스크립트 공부하기');
    });
  });

  context('추가 버튼을 누르면', () => {
    it('TASK가 추가되고 value는 공백으로 바뀐다.', () => {
      const { container, getByText, getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      // value를 수정한다.
      fireEvent.change(input, {
        target: {
          value: TASK,
        },
      });
      // 추가 버튼을 누른다.
      fireEvent.click(getByText('추가'));
      // 할 일 목록이 추가된다.
      expect(container).toHaveTextContent(TASK);
      expect(input.value).toBe('');
    });
  });

  context('완료 버튼을 누르면', () => {
    it('할 일이 삭제된다.', () => {
      const { getByText, getByPlaceholderText } = render(<App />);
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      // value를 수정한다.
      fireEvent.change(input, {
        target: {
          value: TASK,
        },
      });
      // 추가 버튼을 누른다.
      fireEvent.click(getByText('추가'));
      // 할 일 목록이 추가된다.
      const task = getByText(TASK);
      const removeButton = getByText('완료');
      // 완료 버튼을 클릭하면
      fireEvent.click(removeButton);
      // 페이지에서 사라진다.
      expect(task).not.toBeInTheDocument();
    });
  });
});
