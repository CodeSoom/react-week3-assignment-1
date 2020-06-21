import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('<Page />', () => {
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('할 일이 없다면', () => {
    const tasks = [];

    it('"할 일이 없어요!" 문구가 보인다.', () => {
      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일이 있다면', () => {
    const tasks = [
      {
        id: 1,
        title: '할 일1',
      },
      {
        id: 2,
        title: '할 일2',
      },
    ];

    it('추가된 할 일들이 보인다.', () => {
      const { container } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );

      expect(container).toHaveTextContent('할 일1');
      expect(container).toHaveTextContent('할 일2');
    });
  });

  context('사용자가 "할 일1"이라는 할 일을 입력하면', () => {
    it(' 입력창에 "할 일1" 문구가 입력창에 보인다 ', () => {
      const { getByLabelText } = render(
        <Page tasks={[]} onChange={handleChangeTitle} />,
      );

      expect(getByLabelText('할 일').value).toBe('');

      fireEvent.change(getByLabelText('할 일'), {
        target: {
          value: '할 일1',
        },
      });

      expect(getByLabelText('할 일').value).toBe('할 일1');
    });
  });

  context('사용자가 할 일을 입력한 후 추가 버튼을 누르면', () => {
    it(' "할 일을 입력해 주세요" 이라는 문구가 보인다.', async () => {
      const { getByLabelText, getByText, getByPlaceholderText } = render(
        <Page
          tasks={[]}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
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
