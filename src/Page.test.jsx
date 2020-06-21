import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

import tasks from './__fixture__/tasks';

describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('사용자가 처음 page를 봤다면', () => {
    it('"To-do" 문구가 보인다.', () => {
      const { container } = render(<Page tasks={[]} />);

      expect(container).toHaveTextContent('To-do');
    });
  });

  context('할 일이 없다면', () => {
    it('"할 일이 없어요!" 문구가 보인다.', () => {
      const { container } = render(<Page tasks={[]} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있다면', () => {
    it('할 일들이 보인다.', () => {
      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');
      expect(container).toHaveTextContent('할 일3');
    });

    it('할 일을 삭제하는 완료 버튼이 보인다.', () => {
      const { getAllByText } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      const doneButtons = getAllByText('완료');

      expect(handleClickDeleteTask).not.toBeCalled();

      doneButtons.forEach((doneButton) => fireEvent.click(doneButton));

      expect(handleClickDeleteTask).toBeCalledWith(doneButtons.length);
    });
  });

  context('사용자가 "바뀐다"라는 할 일을 입력하면', () => {
    it('입력창에 "바뀐다"라는 문구 보인다.', () => {
      const { getByLabelText } = render(
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '바뀐다',
        },
      });

      expect(handleChangeTitle).toBeCalledTimes(1);

      expect(getByLabelText('할 일').value).toBe('바뀐다');
    });
  });

  context('사용자가 할 일을 추가하면', () => {
    it(' 할 일 입력창에는 "할 일을 입력해 주세요" 이라는 문구가 보인다.', () => {
      const { getByLabelText, getByText, getByPlaceholderText } = render(
        <Page
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '할 일1',
        },
      });

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalledTimes(1);

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    });
  });
});
