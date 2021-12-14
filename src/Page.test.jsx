import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

test('Page 테스트', () => {
  const taskTitle = '';
  const handleChange = jest.fn();
  const handleClickAddTask = jest.fn();
  const tasks = [{ id: 1, title: '기상' }];
  const handleClickDeleteTask = jest.fn();
  const { container, getByText, getByPlaceholderText } = render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );
  expect(container).toHaveTextContent('기상');

  fireEvent.click(getByText('추가'));
  expect(handleClickAddTask).toBeCalled();

  fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
    target: { value: '일기쓰기' },
  });
  expect(handleChange).toBeCalled();

  fireEvent.click(getByText('완료'));
  expect(handleClickDeleteTask).toBeCalledWith(1);
});
