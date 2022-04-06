import { render } from '@testing-library/react';

import Page from './Page';

const tasks = [
  { id: 100, title: '운동 하기' },
  { id: 101, title: '공부 하기' },
];

const handleChangeTaskTitle = jest.fn();
const handleClickAddTask = jest.fn();
const handleClickDeleteTask = jest.fn();

const getRenderPage = () => render((
  <Page
    tasks={tasks}
    taskTitle="tasks"
    onChangeTitle={handleChangeTaskTitle}
    onClickAddTask={handleClickAddTask}
    onClickDeleteTask={handleClickDeleteTask}
  />
));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Page', () => {
  it('renders title', () => {
    const { container } = getRenderPage();

    expect(container).toHaveTextContent('To-do');
  });

  it('renders tasks', () => {
    const { container } = getRenderPage();

    tasks.forEach((task) => {
      expect(container).toHaveTextContent(task.title);
    });
  });
});
