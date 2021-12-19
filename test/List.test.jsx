import { fireEvent, render } from '@testing-library/react';

import List from '../src/List';

describe('List', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let mockTasks = null;
  const handleClick = jest.fn();

  const renderComponent = (tasks = []) => {
    const { container, getAllByRole, getByRole } = render((
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />
    ));

    return { container, getAllByRole, getByRole };
  };

  context('List 컴포넌트가 렌더링될 때', () => {
    it('task 가 비어 있다면, "할 일이 없어요!" 가 노출된다.', () => {
      mockTasks = [];
      const { container } = renderComponent(mockTasks);

      expect(container).not.toBe(null);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('tasks 가 있다면, 길이만큼 요소가 노출된다.', () => {
      mockTasks = [
        { id: 1, title: 'hello' },
        { id: 2, title: 'hello' },
        { id: 3, title: 'hello' },
      ];
      const { container, getAllByRole } = renderComponent(mockTasks);
      expect(container).not.toBe(null);
      expect(getAllByRole('listitem')).toHaveLength(3);
    });
  });

  it('완료 버튼 클릭 시 onClickDelete 가 호출된다.', () => {
    mockTasks = [
      { id: 1, title: 'hello' },
    ];
    const { getByRole } = renderComponent(mockTasks);
    fireEvent.click(getByRole('button', { name: /완료/i }));
    expect(handleClick).toBeCalledWith(1);
  });
});
