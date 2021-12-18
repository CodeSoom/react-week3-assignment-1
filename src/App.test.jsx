import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const emptyText = '할 일이 없어요!';
  const renderApp = () => render(<App />);

  context('할 일이 없을 때', () => {
    it('할 일이 없으면, 디폴트 텍스트를 화면에 띄운다.', () => {
      const { queryByText } = renderApp();
      const textElement = queryByText(emptyText);

      expect(textElement).not.toBe(null);
    });

    it('할 일을 추가하면, 화면에 할 일이 나타난다.', () => {
      const todo = '독서하기';
      const { queryByDisplayValue, queryByText } = renderApp();

      fireEvent.change(queryByDisplayValue(''), { target: { value: todo } });
      fireEvent.click(queryByText('추가'));

      expect(queryByText(todo)).not.toBe(null);
    });
  });

  context('할 일이 있을 때', () => {
    it('새로운 할 일을 추가할 수 있다.', () => {
      const todo1 = '독서하기';
      const todo2 = '독후감쓰기';

      const { queryByDisplayValue, queryByText } = renderApp();
      const inputElement = queryByDisplayValue('');

      fireEvent.change(inputElement, { target: { value: todo1 } });
      fireEvent.click(queryByText('추가'));

      fireEvent.change(inputElement, { target: { value: todo2 } });
      fireEvent.click(queryByText('추가'));

      expect(queryByText(todo2)).not.toBe(null);
    });

    it('완료 버튼을 누르면 할 일이 화면에서 사라진다.', () => {
      const todo = '독서하기';
      const { queryByDisplayValue, queryByText } = renderApp();

      fireEvent.change(queryByDisplayValue(''), { target: { value: todo } });
      fireEvent.click(queryByText('추가'));
      fireEvent.click(queryByText('완료'));

      expect(queryByText(todo)).toBe(null);
    });

    it('할 일이 없어지면, 디폴트 텍스트가 화면에 나타난다.', () => {
      const todo = '독서하기';
      const { queryByDisplayValue, queryByText } = renderApp();

      fireEvent.change(queryByDisplayValue(''), { target: { value: todo } });
      fireEvent.click(queryByText('추가'));
      fireEvent.click(queryByText('완료'));

      expect(queryByText(emptyText)).not.toBe(null);
    });
  });
});
