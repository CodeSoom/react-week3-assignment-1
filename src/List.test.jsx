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

  it('ol html should be existed when tasks.length value is 1 or more ', () => {
    const tasks = ['not today'];
    const { container } = renderListComponent(tasks);
    expect(container).toContainHTML('ol');
  });
});
