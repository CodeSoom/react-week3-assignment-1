import React from 'react';

import {
  fireEvent,
  render,
} from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const taskTitle = '아무것도 하지 않기';
  const inputLabel = '할 일';

  context('empty tasks', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('할 일 입력한다.', () => {
      const handleChangeTitle = jest.fn();
      const { getByLabelText } = render((
        <Page
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
        />
      ));
      const input = getByLabelText(inputLabel);

      expect(input).toHaveDisplayValue('');
      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(input, { target: { value: taskTitle } });

      expect(handleChangeTitle).toBeCalled();
      expect(input).toHaveDisplayValue(taskTitle);
    });
  });

  context('exist tasks', () => {
    const tasks = [
      { id: 1, title: '코드숨 과제하기' },
      { id: 2, title: '아무것도 하지 않기' },
    ];

    it('tasks.title이 화면에 표시되는지 확인한다.', () => {
      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });

    it('완료 버튼 클릭시 onClickDeleteTask호출되었는지 확인한다.', () => {
      const handleClickDeleteTask = jest.fn();
      const { getAllByText } = render((
        <Page
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));
      const buttons = getAllByText('완료');

      expect(handleClickDeleteTask).not.toBeCalled();
      buttons.forEach((button) => fireEvent.click(button));
      expect(handleClickDeleteTask).toBeCalledWith(1);
      expect(handleClickDeleteTask).toBeCalledWith(2);
    });

    it('할 일 입력한다.', () => {
      const handleChangeTitle = jest.fn();
      const { getByLabelText } = render((
        <Page
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
        />
      ));
      const input = getByLabelText(inputLabel);

      expect(input).toHaveDisplayValue('');
      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(input, { target: { value: taskTitle } });

      expect(handleChangeTitle).toBeCalled();
      expect(input.value).toBe(taskTitle);
    });

    test('추가 버튼 클릭', () => {
      const handleClickAddTask = jest.fn();
      const { getByLabelText, getByText, container } = render((
        <Page
          tasks={tasks}
          onClickAddTask={handleClickAddTask}
        />
      ));
      const input = getByLabelText(inputLabel);
      const button = getByText('추가');

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.change(input, { target: { value: taskTitle } });
      fireEvent.click(button);

      expect(handleClickAddTask).toBeCalled();
      expect(input).toHaveDisplayValue('');
      expect(container).toHaveTextContent(taskTitle);
    });
  });
});
