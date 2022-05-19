import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('subject is displayed', () => {
    render(<App />);

    const subject = screen.getByText('To-do');

    expect(subject).toBeInTheDocument();
  });

  it('todo input is empty and 추가 button is displayed', () => {
    render(<App />);

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = screen.getByText('추가');

    expect(inputTodo.value).toBe('');
    expect(addButton).toBeInTheDocument();
  });

  context('The task is empty', () => {
    it('할 일이 없어요! is displayed', () => {
      const tasks = [];

      const { container } = render(<App tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  it('todo input is changed', () => {
    render(<App />);

    const todo = '뭐라도 하기';

    const inputTodo = screen.getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');
  });

  it('Add button is working', () => {
    const todo = '뭐라도 하기';

    const { container, getByText, getByPlaceholderText } = render(<App />);

    const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(inputTodo, { target: { value: todo } });
    expect(inputTodo.value).toBe('뭐라도 하기');

    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('뭐라도 하기');

    expect(inputTodo.value).toBe('');
  });

  it('Delete button is working', () => {
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
