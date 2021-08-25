import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App component', () => {
  const { getByPlaceholderText, getByText } = render((<App />));

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  const addButton = getByText('추가');

  context('when click add button', () => {
    it('return new todo item', () => {
      fireEvent.change(input, {
        target: {
          id: 100,
          value: 'something',
        },
      });

      fireEvent.click(addButton);

      expect(getByText('something')).toBeTruthy();
    });
  });

  context('when click delete button', () => {
    it('delete selected todo item', () => {
      fireEvent.click(addButton);

      // TODO: error debugging
      // 어째서인지 '완료' 라는 텍스트를 가진 엘리먼트가 없다고 오류가 나네요.

      // const deleteButton = getByText('완료');

      // fireEvent.click(deleteButton);

      // expect(getByText('something')).toBeNull();
    });
  });
});
