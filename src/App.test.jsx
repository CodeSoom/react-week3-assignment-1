import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const emptyText = '할 일이 없어요!';
  const renderApp = () => render(<App />);

  context('task가 없을 때', () => {
    it('"할 일이 없어요!" 텍스트를 화면에 띄운다.', () => {
      const { queryByText } = renderApp();
      const textElement = queryByText(emptyText);

      expect(textElement).not.toBe(null);
    });

    it('task를 추가하면, 화면에 할 일이 나타난다.', () => {
      const task = '독서하기';
      const { queryByDisplayValue, queryByText } = renderApp();

      fireEvent.change(queryByDisplayValue(''), { target: { value: task } });
      fireEvent.click(queryByText('추가'));

      expect(queryByText(task)).not.toBe(null);
    });
  });

  context('task가 있을 때', () => {
    it('새로운 task를 추가할 수 있다.', () => {
      const task1 = '독서하기';
      const task2 = '독후감쓰기';

      const { queryByDisplayValue, queryByText } = renderApp();
      const inputElement = queryByDisplayValue('');

      fireEvent.change(inputElement, { target: { value: task1 } });
      fireEvent.click(queryByText('추가'));

      fireEvent.change(inputElement, { target: { value: task2 } });
      fireEvent.click(queryByText('추가'));

      expect(queryByText(task2)).not.toBe(null);
    });

    it('"완료" 버튼을 누르면 할 일이 화면에서 사라진다.', () => {
      const task = '독서하기';
      const { queryByDisplayValue, queryByText } = renderApp();

      fireEvent.change(queryByDisplayValue(''), { target: { value: task } });
      fireEvent.click(queryByText('추가'));
      fireEvent.click(queryByText('완료'));

      expect(queryByText(task)).toBe(null);
    });

    it('task가 제거되면, "할 일이 없어요! 텍스트가 화면에 나타난다.', () => {
      const task = '독서하기';
      const { queryByDisplayValue, queryByText } = renderApp();

      fireEvent.change(queryByDisplayValue(''), { target: { value: task } });
      fireEvent.click(queryByText('추가'));
      fireEvent.click(queryByText('완료'));

      expect(queryByText(emptyText)).not.toBe(null);
    });
  });
});
