import { render } from '@testing-library/react';

import List from './List';

describe('List component', () => {
  const onClickDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderListComponent = (tasks) =>
    render(<List tasks={tasks} onClickDelete={onClickDelete} />);

  it("p html tag text should be '할 일이 없어요!'' when tasks.length is 0", () => {
    const tasks = [];
    const { getByText } = renderListComponent(tasks);
    expect(getByText('할 일이 없어요!')).toContainHTML('p');
  });

  it('ol html tag should be existed when tasks.length value is 1 or more ', () => {
    const tasks = ['not today'];
    const { container } = renderListComponent(tasks);
    expect(container).toContainHTML('ol');
  });

  it('tasks array values should be displayed on the screen', () => {
    const tasks = [
      { id: 12, title: 'done is better than perfect' },
      { id: 102, title: '돈은 완벽보다 낫다' },
      { id: 1, title: '완료하는 것이 완벽보다 낫다' },
    ];
    const { container } = renderListComponent(tasks);

    expect(container).toHaveTextContent('done is better than perfect');
    expect(container).toHaveTextContent('돈은 완벽보다 낫다');
    expect(container).toHaveTextContent('완료하는 것이 완벽보다 낫다');
  });
});
