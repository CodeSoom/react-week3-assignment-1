import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  describe('할일 추가 버튼 클릭', () => {
    it('입력한 내용이 리스트에 추가되는지 확인한다.', () => {
      const { container, getByPlaceholderText, getByText } = render(<App />);
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: '일기쓰기' },
      });
      fireEvent.click(getByText('추가'));
      expect(container).toHaveTextContent('일기쓰기');
    });
  });

  describe('완료 버튼 클릭시', () => {
    it('할 일이 삭제되는지 확인한다', () => {
      const { container, getByPlaceholderText, getByText } = render(<App />);
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: '일기쓰기' },
      });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));
      expect(container).not.toHaveTextContent('일기쓰기');
    });
  });

  describe('더 이상 노출할 목록이 없을 때', () => {
    it('할 일이 없어요!"문구가 노출되는지 확인한다.', () => {
      const { container, getByPlaceholderText } = render(<App />);
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: { value: '일기쓰기' },
      });
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
