import { render } from '@testing-library/react';

import List from './List';

describe('List 컴포넌트는', () => {
  const noTasks = [];
  const tasks = [{
    id: 1,
    title: '할 일 추가했음',
  }];
  const handleClick = jest.fn();

  context('task가 없으면', () => {
    it('할 일이 없다는 문자를 리턴한다', () => {
      const { getByText } = render(
        <List tasks={noTasks} />,
      );

      getByText('할 일이 없어요!');
    });
  });

  context('tasks가 있으면', () => {
    it('할일 목록을 리턴한다', () => {
      const { getByText } = render(
        <List
          tasks={tasks}
        />,
      );

      getByText(tasks[0].title);

      expect(tasks[0]).toMatchObject({
        id: 1,
        title: '할 일 추가했음',
      });
    });
  });

  it('List 컴포넌트에서 삭제 함수를 전달하는가?', () => {
    render(
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />,
    );

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
