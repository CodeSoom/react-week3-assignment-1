import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트', () => {
  describe('Given : task가 없으면', () => {
    test('When : 값들이 없을때', () => {
      const { container } = render((
        <App />
      ));
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
  describe('Given : task를 추가하면', () => {
    const taskTitle = '아리 산책가기';
    test('When : 값을 입력했을 때', () => {
      const { getByPlaceholderText, getByText, container } = render((
        <App />
      ));
      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');

      const input = getByPlaceholderText('할 일을 입력해 주세요');
      fireEvent.change(input, { target: { value: taskTitle } });
      expect(input.value).toBe(taskTitle);

      fireEvent.click(getByText('추가'));
      expect(input.value).toBe('');

      fireEvent.click(getByText('완료'));
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
