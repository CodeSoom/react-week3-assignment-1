import { render } from '@testing-library/react';

import Page from './Page';
import Input from './Input';
import List from './List';

const handleChange = jest.fn();
const handleClickAdd = jest.fn();
const handleClickDelete = jest.fn();
const taskTitle = '나는 타이틀';
const tasks = [
  { id: 1, task: '코드숨 과제하기!' },
  { id: 2, task: '테스트 주도 개발 공부하기!' },
];

// Input과 List는 이미 테스트함. 둘 다 호출하는지 여부를 테스트?
test('Page', () => {
  const { container } = render((
    <Page
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelete}
      tasks={tasks}
    />
  ));
  const { container: inputContainer } = render((
    <Input
      value={taskTitle}
      onChange={handleChange}
      onClick={handleClickAdd}
    />
  ));
  const { container: listContainer } = render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toContainHTML(inputContainer.innerHTML);
  expect(container).toContainHTML(listContainer.innerHTML);
});
