import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  const value = '과제하기';

  const renderApp = () => render((
    <App />
  ));

  context('input 타이핑을 하면', () => {
    it('타이핑한 내용이 input에 표시되어야 한다.', () => {
      const { getByTestId } = renderApp();
      const taskInput = getByTestId('task-input');

      expect(taskInput.value).toBe('');
      fireEvent.change(taskInput, { target: { value } });
      expect(taskInput.value).toBe(value);
    });
  });

  context('"추가" 버튼을 누르면', () => {
    it('task가 추가되어야 한다.', () => {
      const {
        getByText, getAllByTestId, getByTestId,
      } = renderApp();
      const taskInput = getByTestId('task-input');

      fireEvent.change(taskInput, { target: { value } });
      fireEvent.click(getByText('추가'));
      const countOfItem = getAllByTestId('task-item').length;
      const taskList = getByTestId('task-list');

      expect(taskList).toHaveTextContent(value);
      expect(countOfItem).toBe(1);
    });

    it('input이 비워져야 한다.', () => {
      const { getByText, getByTestId } = renderApp();
      const taskInput = getByTestId('task-input');

      fireEvent.change(taskInput, { target: { value } });
      expect(taskInput).toHaveValue(value);
      fireEvent.click(getByText('추가'));
      expect(taskInput).toHaveValue('');
    });
  });

  context('"완료" 버튼을 누르면', () => {
    it('완료된 task가 삭제 되어야 한다.', () => {
      const {
        getByText, getAllByTestId, getByTestId,
      } = renderApp();
      const taskInput = getByTestId('task-input');

      fireEvent.change(taskInput, { target: { value } });
      fireEvent.click(getByText('추가'));
      fireEvent.click(getByText('완료'));

      expect(() => getAllByTestId('task-item').length).toThrowError();
    });
  });
});
