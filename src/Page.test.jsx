import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

test('App', () => {
  const handleChange = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const { container, getByRole, getByText } = render(
    <Page
      taskTitle="타이틀"
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAddTask}
      tasks={[{ id: 1, title: '일어나기' }]}
      onClickDeleteTask={handleClickDeleteTask}
    />
  );

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일');

  expect(handleChange).not.toBeCalled();
  fireEvent.change(getByRole('textbox'), { target: { value: '세수하기' } });
  expect(handleChange).toBeCalled();

  expect(handleClickAddTask).not.toBeCalled();
  fireEvent.click(getByText('추가'));
  expect(handleClickAddTask).toBeCalled();

  expect(container).toHaveTextContent('일어나기');

  expect(handleClickDeleteTask).not.toBeCalled();
  fireEvent.click(getByText('완료'));
  expect(handleClickDeleteTask).toBeCalledWith(1);
});
