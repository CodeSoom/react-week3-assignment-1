import { render, screen } from '@testing-library/react';

import List from './List';

import { EMPTY_TASK, TASKS } from './fixture';

describe('List', () => {
  const onClickDelete = jest.fn();

  const renderList = (tasks) => render(
    <List tasks={tasks} onClickDelete={onClickDelete} />,
  );

  it('할 일의 이름이 "완료" 버튼과 함께 그려집니다', () => {
    const { container } = renderList(TASKS);

    expect(container).toHaveTextContent(TASKS[0].title);
    expect(container).toHaveTextContent(TASKS[1].title);
    expect(screen.getAllByText('완료')).toHaveLength(TASKS.length);
  });

  it('할 일이 없으면 빈 화면용 메세지를 보여줍니다', () => {
    const { container } = renderList(EMPTY_TASK);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
