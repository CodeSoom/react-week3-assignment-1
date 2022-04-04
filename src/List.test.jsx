import { fireEvent, getByText, render } from '@testing-library/react';

import List from './List';

const emptyValue = '할 일이 없어요!';
const tasks = [
  { id: 100, title: '밥먹기' },
  { id: 101, title: '테스트 코드 짜기' },
  { id: 102, title: 'PR 날리기' },
];

const onClickDelete = jest.fn();

test('dose render empty value', () => {
  const { container } = render(<List tasks={[]} onClickDelete={onClickDelete} />);
  expect(container).toHaveTextContent(emptyValue);
});

describe('tasks', () => {
  test('dose render 1 task', () => {
    const task = tasks[0];
    const { container } = render(<List tasks={[task]} onClickDelete={onClickDelete} />);
    expect(container).toHaveTextContent(task.title);
  });

  test('dose render 3 tasks', () => {
    const { container } = render(<List tasks={tasks} onClickDelete={onClickDelete} />);
    tasks.forEach((task) => expect(container).toHaveTextContent(task.title));
  });
});

describe('onClickDelete', () => {
  test('dose trigger onClickDelete', () => {
    const task = tasks[0];
    const { container } = render(<List tasks={[task]} onClickDelete={onClickDelete} />);
    expect(onClickDelete).not.toBeCalled();

    fireEvent.click(getByText(container, '완료'));
    expect(onClickDelete).toBeCalledWith(task.id);
  });
});
