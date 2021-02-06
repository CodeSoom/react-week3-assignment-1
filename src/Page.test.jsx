import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const taskTitle = '';

  function renderPage(
    {
      tasks,
    },
  ) {
    return render((
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        tasks={tasks}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  context('tasks의 length가 0인 경우', () => {
    it('"할 일이 없어요!"를 표시한다.', () => {
      const tasks = [];

      const {
        container,
        getByLabelText,
        getByPlaceholderText,
        getByText,
      } = renderPage({
        tasks,
      });

      expect(container).toHaveTextContent('할 일이 없어요!');

      expect(getByLabelText('할 일')).toBeInTheDocument();
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      expect(getByText('추가')).toBeInTheDocument();
    });
  });

  context('tasks length가 1 이상인 경우', () => {
    const tasks = [
      {
        id: 1,
        title: '일과1',
      },
      {
        id: 2,
        title: '일과2',
      },
    ];

    it('input, 할일목록, 완료버튼을 모두 표시한다.', () => {
      const {
        container,
        getAllByTestId,
        getAllByText,
      } = renderPage({
        tasks,
      });

      expect(getAllByTestId('todo-item')).toHaveLength(tasks.length);
      expect(getAllByText('완료')).toHaveLength(tasks.length);

      tasks.forEach(todoItem => {
        expect(container).toHaveTextContent(todoItem.title);
      });
    });
  });
});
