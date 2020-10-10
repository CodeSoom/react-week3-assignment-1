import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const renderPage = ({ task, tasks }) => render((
    <Page
      taskTitle={task}
      onChangeTitle={handleChangeTitle}
      onClickAddTask={handleClickAddTask}
      tasks={tasks}
      onClickDeleteTask={handleClickDeleteTask}
    />
  ));

  context('without tasks', () => {
    const tasks = [];
    const inputLabel = '할 일';
    const task = '아무것도 하지 않기';

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderPage({ tasks });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('할 일을 추가한다.', () => {
      const { getByLabelText, getByText } = renderPage({ task, tasks });
      const input = getByLabelText(inputLabel);

      expect(input).toHaveDisplayValue(task);
      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
      expect(input).toHaveDisplayValue('');
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '코드숨 과제하기' },
      { id: 2, title: '아무것도 하지 않기' },
    ];
    const inputLabel = '할 일';
    const task = '아무것도 하지 않기';

    it('tasks.title이 화면에 표시되는지 확인한다.', () => {
      const { container } = renderPage({ tasks });

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });

    it('완료 버튼 클릭시 onClickDeleteTask호출되었는지 확인한다.', () => {
      const { getAllByText } = renderPage({ tasks });
      const buttons = getAllByText('완료');

      expect(handleClickDeleteTask).not.toBeCalled();

      buttons.forEach((button) => fireEvent.click(button));

      expect(handleClickDeleteTask).toBeCalledWith(1);
      expect(handleClickDeleteTask).toBeCalledWith(2);
    });

    it('할 일을 추가한다.', () => {
      const { getByLabelText, getByText } = renderPage({ task, tasks });
      const input = getByLabelText(inputLabel);

      expect(input).toHaveDisplayValue(task);
      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
      expect(input).toHaveDisplayValue('');
    });
  });
});
