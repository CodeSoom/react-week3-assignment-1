import { render, screen } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('Tasks.length === 0', () => {
    const emptyTasks = [];
    const onClickDelete = jest.fn();
    const { container } = render(
      <List tasks={emptyTasks} onClickDelete={onClickDelete} />,
    );

    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('Tasks.length >0', () => {
    const tasks = [
      { id: 1, title: '뭐라도 하기' },
      { id: 2, title: 'jest 공부 하기' },
      { id: 3, title: 'mock 공부 하기' },
    ];
    const onClickDelete = jest.fn();
    render(<List tasks={tasks} onClickDelete={onClickDelete} />);
    const listItems = screen.getAllByRole('listitem');

    // 기대 : tasks.length 만큼 <li/> or <Item/> element가 생성됐는지 확인한다
    expect(listItems).toHaveLength(tasks.length);

    // 기대 : 생성된 1번째 element에 TextContent값으로 tasks[1][title]과 같은지 확인한다
    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(tasks[index].title);
    });
  });
});
