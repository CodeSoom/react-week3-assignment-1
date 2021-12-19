import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDelete = jest.fn();

  const renderPage = (taskTitle, tasks) => render(
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDelete}
    />,
  );

  it('taskTitle 값은 input 엘리먼트 값으로 설정된다.', () => {
    const taskTitle = 'task-#1';
    const { queryByDisplayValue } = renderPage(taskTitle, []);

    expect(queryByDisplayValue(taskTitle)).not.toBe(null);
  });

  it('tasks의 title 값은 화면에 나타난다.', () => {
    const tasks = [{ id: 1, title: '할 일 #1' }];
    const { queryByText } = renderPage('', tasks);

    expect(queryByText(tasks[0].title)).not.toBe(null);
  });

  it('텍스트를 입력하면, onChangeTitle 핸들러 함수가 실행된다.', () => {
    const { queryByDisplayValue } = renderPage('', []);
    const inputElement = queryByDisplayValue('');

    const text = 'onChangeTitle 테스트';
    fireEvent.change(inputElement, { target: { value: text } });

    expect(handleChangeTitle).toBeCalled();
  });

  it('"추가" 버튼을 클릭하면, onClickAddTask 핸들러 함수가 실행된다.', () => {
    const tasks = [{ id: 1, title: '할 일 #1' }];

    const { queryByText } = renderPage('', tasks);
    const buttonElement = queryByText('추가');

    fireEvent.click(buttonElement);

    expect(handleClickAddTask).toBeCalled();
  });

  it('"완료" 버튼을 클릭하면, onClickDelete 핸들러 함수가 실행된다.', () => {
    const tasks = [{ id: 1, title: '할 일 #1' }];

    const { queryByText } = renderPage('', tasks);
    const buttonElement = queryByText('완료');

    fireEvent.click(buttonElement);

    expect(handleClickDelete).toBeCalled();
  });
});
