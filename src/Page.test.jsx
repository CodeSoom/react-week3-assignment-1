import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  it('Shows text', () => {
    const tasks = [];

    const { queryByText } = render(<Page tasks={tasks} />);

    expect(queryByText('To-do')).not.toBeNull();
  });

  context('When list with tasks', () => {
    it('Shows tasks on the list', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기',
        },
      ];

      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('뭐라도 하기');
    });
  });

  context('When list without tasks', () => {
    it('Shows other nodes', () => {
      const tasks = [];

      const { container } = render(<Page tasks={tasks} />);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('When click 추가 button', () => {
    it('Calls onClickAddTask', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기',
        },
      ];

      const onClickAddTask = jest.fn();

      const { getByText } = render((
        <Page
          tasks={tasks}
          onClickAddTask={onClickAddTask}
        />
      ));

      expect(onClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(onClickAddTask).toBeCalled();
    });
  });

  context('When click 완료 button in tasks', () => {
    it('Calls OnClickDeleteTask with parameter(id: 1)', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기',
        },
      ];

      const onClickDeleteTask = jest.fn();

      const { getByText } = render((
        <Page
          tasks={tasks}
          onClickDeleteTask={onClickDeleteTask}
        />
      ));

      expect(onClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(onClickDeleteTask).toBeCalledWith(1);
    });
  });
});
