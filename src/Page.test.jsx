import { fireEvent, render } from '@testing-library/react';

import Page from './Page';
// page를 실행 하기 위한 샘플에 대해 서술하게 됨
describe('Page', () => {
  const taskTitle = '할일 입력중';
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  context('when tasks is empty', () => {
    it('renders <Input> & <List>', () => {
      const tasks = [];
      const { container } = render(
        <Page
          taskTitle=""
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );
      expect(container).toHaveTextContent(/할 일/);
      expect(container).toHaveTextContent(/추가/);
      expect(container).not.toHaveTextContent(/완료/);
      expect(container).toHaveTextContent(/할 일이 없어요/);
    });
  });

  context('when tasks is not empty', () => {
    it('renders <Input> & <List>', () => {
      // page를 위한 샘플 데이터를 작성 하게 됨.
      const tasks = [
        { id: 1, title: '뭐라도 하기' },
        { id: 2, title: 'jest 공부 하기' },
        { id: 3, title: 'mock 공부 하기' },
      ];
      const { container, getByText } = render(
        <Page
          taskTitle={taskTitle}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          tasks={tasks}
          onClickDeleteTask={handleClickDeleteTask}
        />,
      );
      // screen.debug();
      expect(container).toHaveTextContent(/할 일/);
      expect(container).toHaveTextContent(/추가/);
      expect(container).toHaveTextContent(/완료/);
      expect(getByText(/뭐라도 하기/)).not.toBeNull();
      expect(getByText(/jest 공부 하기/)).not.toBeNull();
      expect(getByText(/mock 공부 하기/)).not.toBeNull();

      fireEvent.click(getByText(/추가/));

      expect(handleClickAddTask).toBeCalled();
    });
  });
});
