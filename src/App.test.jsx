import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('shows subject To-do', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('To-do');
  });

  it('shows empty todo input and 추가 button', () => {
    const { container } = render(<App />);

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    expect(inputTodo.value).toBe('');
    expect(container).toHaveTextContent('추가');
  });

  context('without tasks', () => {
    it('shows 할 일이 없어요!', () => {
      const tasks = [];

      const { container } = render(<App tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  it('changes todo input', () => {
    render(<App />);

    const todo = '뭐라도 하기';

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');
  });

  it('adds the task', () => {
    const todo = '뭐라도 하기';

    const { container, getByText, getByPlaceholderText } = render(<App />);

    const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');

    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('뭐라도 하기');

    expect(inputTodo.value).toBe('');
  });

  it('deletes the task', () => {
    const todo = '뭐라도 하기';

    const { container, getByText, getByPlaceholderText } = render(<App />);

    const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');

    fireEvent.click(getByText('추가'));
    expect(container).toHaveTextContent('뭐라도 하기');

    fireEvent.click(getByText('완료'));
    expect(container).not.toHaveTextContent('뭐라도 하기');
  });
});
