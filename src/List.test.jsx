import { render, screen } from '@testing-library/react';

import List from './List';
/** 리스트 컴포넌트는 역활은 ?
 * 1) array인 tasks의 length 길이에 따라 다른 뷰를 그린다.
 * 2) tasks.length === 0 이면, <p> 할 일이 없어요!</p>
 * 3) tasks.length !== 0 이면, 배열의 길이만큼 <Item/> 을 그려야한다
 *
 ** 이 역활을 수행하는 전제 조건은?
 * 1] props값으로 tasks(array), onClickDelete(func)을 요구한다
 * 2] tasks는 ArrayOfObject형태이며, 각 아이템들은 {id:(number), title:(string)}값을 갖고있어야 한다.
 * 3] onClickDelete는 Item에서 사용할 함수로 null이 아니여야한다.
 * 4] tasks또한 tasks.length를 수행하기 위해서는 null이 아니여야한다
 * */

it('renders <p>할 일이 없어요!</p> when Task.length === 0', () => {
  const emptyTasks = [];
  const onClickDelete = jest.fn();
  const { container } = render(
    <List tasks={emptyTasks} onClickDelete={onClickDelete} />,
  );

  expect(container).toHaveTextContent('할 일이 없어요!');
});

it('render tags as many number of tasks', () => {
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
