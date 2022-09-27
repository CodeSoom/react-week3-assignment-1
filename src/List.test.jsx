import { render } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  const noTasks = [];
  const tasks = [{
    id: 1,
    title: '할 일 추가했음',
  }];
  const handleClick = jest.fn(() => true);

  it('List 컴포넌트에 tasks가 없다는 요소가 있는가?', () => {
    const { getByText } = render(
      <List tasks={noTasks} />,
    );

    getByText('할 일이 없어요!'); // tasks 없음 메시지 요소가 있는지 확인
  });

  it('List 컴포넌트에 task가 있는가?', () => {
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

  it('List 컴포넌트에서 삭제 함수를 전달하는가?', () => {
    render(
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />,
    );

    expect(handleClick).toHaveBeenCalledTimes(0); // 전달되는 함수는 있지만 호출은 안하는지 확인
  });
});
