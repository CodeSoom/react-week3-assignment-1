import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  context('with tasks', () => {
    it('renders without crashing', () => {
      const tasks = [{
        id: 1,
        title: '뭐라도 하기',
      }, {
        id: 2,
        title: '맛있는 음식 먹기',
      }];

      const handleChangTitle = jest.fn();
      const handleClickAddTask = jest.fn();
      const handleClickDeleteTask = jest.fn();

      const {
        container,
        getByText,
        getAllByText,
        getByRole,
      } = render((
        <Page
          taskTitle="공부하"
          onChangeTitle={handleChangTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(container).toHaveTextContent('To-do');

      fireEvent.change(getByRole('textbox'), { target: { value: '공부하기' } });

      expect(handleChangTitle).toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
      expect(container).toHaveTextContent('완료');

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDeleteTask).toBeCalledWith(1);
    });
  });

  context('with no task', () => {
    it('renders without crashing', () => {
      const handleChangTitle = jest.fn();
      const handleClickAddTask = jest.fn();
      const handleClickDeleteTask = jest.fn();

      const {
        container,
        getByText,
        getByRole,
      } = render((
        <Page
          taskTitle="공부하"
          onChangeTitle={handleChangTitle}
          onClickAddTask={handleClickAddTask}
          tasks={[]}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(container).toHaveTextContent('To-do');
      expect(container).toHaveTextContent('할 일이 없어요!');

      fireEvent.change(getByRole('textbox'), { target: { value: '공부하기' } });

      expect(handleChangTitle).toBeCalled();

      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });
});
