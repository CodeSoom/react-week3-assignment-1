import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('task가 없으면', () => {
    it('빈 메시지를 보여준다', () => {
      const { container } = render((
        <App />
      ));
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('task가 있으면', () => {
    const taskTitle = '아리 산책가기';

    it('할 일 목록을 보여준다', () => {
      const { getByPlaceholderText, getByText, container } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input).toHaveValue(taskTitle);

      fireEvent.click(getByText('추가'));
      expect(container).toHaveTextContent(taskTitle);
    });
  });

  describe('할 일 목록 추가 버튼을 클릭은', () => {
    it('input을 초기화한다', () => {
      const taskTitle = '아리 산책가기';
      const { getByPlaceholderText, getByText } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: '아리 산책가기' } });
      expect(input).toHaveValue(taskTitle);

      fireEvent.click(getByText('추가'));

      expect(input).toHaveValue('');
    });
  });

  describe('완료 버튼 클릭은', () => {
    it('할 일 목록을 삭제한다.', () => {
      const taskTitle = '아리 산책가기';
      const { getByPlaceholderText, getByText, container } = render((
        <App />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: taskTitle } });

      expect(input).toHaveValue(taskTitle);

      fireEvent.click(getByText('추가'));

      expect(container).toHaveTextContent(taskTitle);

      fireEvent.click(getByText('완료'));

      expect(container).not.toHaveTextContent(taskTitle);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
