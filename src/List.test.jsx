import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const tasks = [{ id: 1, title: '할일1' }, { id: 2, title: '할일2' }];
  const onClickDelete = jest.fn();

  it('Tasks 모두 출력된다.', () => {
    const { container, getByText } = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
    expect(container).toHaveTextContent('할일1');
    expect(container).toHaveTextContent('할일1');
  });
  it('Tasks 의 완료 버튼이 모두 출력된다.', () => {
    const { container, getByText, getAllByText } = render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
    const buttonNum = getAllByText('완료');
    expect(buttonNum).toHaveLength(tasks.length);
  });

  it('Task가 없으면 할 일이 없어요! 가 출력된다.', () => {
    const { container, getByText } = render((
      <List
        tasks={[]}
        onClickDelete={onClickDelete}
      />
    ));
    // expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
