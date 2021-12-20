import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Change Input', () => {
    const task = '3주차 과제하기'
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: task,
      },
    });

    // expect(input).toHaveAttribute('value', '안녕하세요');
    expect(input.value).toEqual(task);
  });

  it('Add todo', () => {
    const task = '과제 하기'
    const { getByText, getByPlaceholderText, container } = render(<App />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const AddButton = getByText('추가');

    fireEvent.change(input, {
      target: {
        value: task,
      },
    });
    fireEvent.click(AddButton);
    
    expect(container).toHaveTextContent('과제 하기');
  });

  it('Delete todo', () => {
    const task = '과제 하기'
    const { getByText, getByPlaceholderText, container } = render(<App />);

    const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');
    const addButton = getByText('추가');
    fireEvent.change(inputTodo, {
      target: {
        value: task,
      },
    });  
    fireEvent.click(addButton);
    
    expect(container).toHaveTextContent(task);

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    expect(container).toHaveTextContent('할 일이 없어요!')
  });
})