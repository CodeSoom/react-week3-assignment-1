import { fireEvent, render } from '@testing-library/react';
import createTestTasks from '../test/utils/createTestTask';
import Page from './Page';

describe('Page', () => {
  const mockChange = jest.fn();
  const mockClick = jest.fn();
  const mockDelete = jest.fn();

  function createTestComponent(taskTitle, tasks = []) {
    return render((
      <Page
        taskTitle={taskTitle}
        tasks={tasks}
        onChangeTitle={mockChange}
        onClickAddTask={mockClick}
        onClickDeleteTask={mockDelete}
      />
    ));
  }

  describe('Input', () => {
    it('입력값이 변경되면 onChange 함수가 1회 호출된다', () => {
      // given
      const expectValue = '테스트2';
      const { getByRole } = createTestComponent();
      const sut = getByRole('textbox');

      // when
      fireEvent.change(sut, { target: { value: expectValue } });

      // then
      expect(mockChange).toBeCalledTimes(1);
    });
  });

  describe('List', () => {
    it('tasks가 없을 경우 안내문구가 반환된다', () => {
      // given
      const expectValue = '할 일이 없어요!';
      const tasks = [];

      // when
      const { container } = createTestComponent('', tasks);

      // then
      expect(container).toHaveTextContent(expectValue);
    });

    it('tasks만큼 task가 나열된다', () => {
      // given
      const taskTitles = ['a', 'b', 'c'];
      const expectValue = taskTitles.length;
      const tasks = createTestTasks(taskTitles);
      const { getAllByRole } = createTestComponent('', tasks);

      // when
      const sut = getAllByRole('listitem');

      // then
      expect(sut).toHaveLength(expectValue);
    });
  });
});
