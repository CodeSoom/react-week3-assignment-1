import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  function renderList(tasks) {
    return render(
      <List tasks={tasks} onClickDelete={onClickDelete} />,
    );
  }

  context('without tasks', () => {
    it('renders no tasks message', () => {
      const emptyTasks = [];
      const { container } = renderList(emptyTasks);

      expect(container).toHaveTextContent(/할 일이 없어요!/);
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '뭐라도 하기' },
      { id: 2, title: 'jest 공부 하기' },
      { id: 3, title: 'mock 공부 하기' },
    ];

    it('renders task titles and "완료" button', () => {
      const { getAllByRole } = renderList(tasks);
      const listItems = getAllByRole(/listitem/);

      // 기대 : tasks.length 만큼 <li/> or <Item/> element가 생성됐는지 확인한다
      expect(listItems).toHaveLength(tasks.length);

      // 기대 : 생성된 1번째 element에 TextContent값으로 tasks[1][title]과 같은지 확인한다
      listItems.forEach((item, index) => {
        expect(item).toHaveTextContent(tasks[index].title);
      });
    });

    it('renders "완료" buttons to delete a task', () => {
      const { getAllByText } = renderList(tasks);
      const itemButtons = getAllByText(/완료/);

      // 기대 : 생성된 task Item의 '완료' 버튼 클릭시, 버튼이 정상적으로 눌린다
      itemButtons.forEach((button, index) => {
        fireEvent.click(button);

        expect(onClickDelete).toBeCalledWith(tasks[index].id);
      });
    });
  });
});
