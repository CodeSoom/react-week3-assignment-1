import {
  render, queryByAttribute, fireEvent,
} from '@testing-library/react';

import App from './App';

describe('App', () => {
  const setup = () => {
    const utils = render(<App />);
    const getById = queryByAttribute.bind(null, 'id');
    const { container, getByTestId } = utils;
    const input = getById(container, 'input-task-title');
    const addButton = getByTestId('addButton');

    return {
      ...utils,
      input,
      addButton,
    };
  };

  it('할 일을 입력하고 추가를 누르면 할 일 목록에 추가한 목록이 보이고 input의 텍스트가 지워진다.', () => {
    const { input, addButton, container } = setup();
    const todo = '운동 1시간 하기';

    fireEvent.change(input, { target: { value: todo } });
    expect(input.value).toBe(todo);

    fireEvent.click(addButton);
    expect(container).toHaveTextContent(todo);
    expect(input.value).toBe('');
  });

  it('할 일을 완료하면 할 일이 목록에서 보이지 않는다.', () => {
    const {
      input, addButton, container, getAllByTestId,
    } = setup();
    const todos = ['운동 1시간 하기', '공부하기'];

    todos.forEach((todo) => {
      fireEvent.change(input, { target: { value: todo } });
      fireEvent.click(addButton);
    });

    const doneButtons = getAllByTestId('doneButton');
    fireEvent.click(doneButtons[0]);

    expect(container).not.toHaveTextContent(todos[0]);
  });
});
