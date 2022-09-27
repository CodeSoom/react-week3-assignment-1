import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const taskTitle = '할 일1';
  const tasks = [{
    id: 2,
    title: '할 일2',
  }];
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();
  const handleChange = jest.fn();

  it('Page 컴포넌트에 h1 요소, input, list 요소가 있는가?', () => {
    const { getByText, getByPlaceholderText } = render(
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChange}
        onClickAddTask={handleClickAdd}
        tasks={tasks}
        onClickDeleteTask={handleClickDelete}
      />,
    );

    getByText('To-do'); // h1 요소 - 타이틀이 있는지 확인

    const input = getByPlaceholderText('할 일을 입력해 주세요'); // 인풋 요소 확인
    fireEvent.change(input, {
      target: {
        value: taskTitle,
      },
    });
    expect(input).toHaveAttribute('value', '할 일1');

    getByText('할 일2'); // 리스트 요소 확인
    expect(tasks[0]).toMatchObject({
      id: 2,
      title: '할 일2',
    });
  });
});
