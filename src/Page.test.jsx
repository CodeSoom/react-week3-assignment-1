import { render } from '@testing-library/react';

import Page from './Page';

test('input', () => {
  const taskTitle = '테스크';
  const tasks = [{ id: 1, title: '너무 어렵네요' }];

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  const { container } = render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />,
  );

  //   expect(container).toHaveTextContent('');

//   fireEvent.click(getByText('추가'));
});
