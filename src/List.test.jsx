import { render, fireEvent } from '@testing-library/react';

import List from './List';
import { EMPTY_TASK, TASKS } from './fixture';

describe('List', () => {
  it('tasks 배열의 title이 "완료" 버튼과 함께 List 컴포넌트에 그려집니다', () => {
    const onClickDelete = jest.fn();

    const { container, getAllByText } = render(
      <List tasks={TASKS} onClickDelete={onClickDelete} />,
    );

    expect(container).toHaveTextContent(TASKS[0].title);
    expect(container).toHaveTextContent(TASKS[1].title);

    expect(getAllByText('완료')).toHaveLength(2);
  });

  it('tasks 배열에 아이템이 없을 경우 List 컴포넌트에 빈 화면용 뷰가 그려집니다', () => {
    const onClickDelete = jest.fn();

    const { container } = render(
      <List tasks={EMPTY_TASK} onClickDelete={onClickDelete} />,
    );

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
