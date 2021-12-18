import { fireEvent, render } from '@testing-library/react';
import List from './List';
import createTestTasks from '../test/utils/createTestTask';

describe('List', () => {
  const mockClick = jest.fn();

  function createTestComponent(tasks = []) {
    return render((
      <List tasks={tasks} onClickDelete={mockClick} />
    ));
  }

  it('tasks가 없을 경우 안내문구가 반환된다', () => {
    // given
    const expectValue = '할 일이 없어요!';
    const tasks = [];

    // when
    const { container } = createTestComponent(tasks);

    // then
    expect(container).toHaveTextContent(expectValue);
  });

  it('tasks만큼 task가 나열된다', () => {
    // given
    const taskTitles = ['a', 'b', 'c'];
    const expectValue = taskTitles.length;
    const tasks = createTestTasks(taskTitles);
    const { getAllByRole } = createTestComponent(tasks);

    // when
    const sut = getAllByRole('listitem');

    // then
    expect(sut).toHaveLength(expectValue);
  });
});
