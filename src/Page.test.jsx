import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

const sampleTasks = [
  { id: 100, title: '운동하기' },
  { id: 101, title: '공부하기' },
];

const handleChangeTaskTitle = jest.fn();
const handleClickAddTask = jest.fn();
const handleClickDeleteTask = jest.fn();

const renderPage = ({ taskTitle, tasks }) => render((
  <Page
    taskTitle={taskTitle}
    tasks={tasks}
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
    const { container } = renderPage({ taskTitle: 'TDD공부하기', tasks: sampleTasks });

    expect(container).toHaveTextContent('To-do');
  });

  it('renders tasks', () => {
    const { container } = renderPage({ taskTitle: 'TDD공부하기', tasks: sampleTasks });

    sampleTasks.forEach((task) => {
      expect(container).toHaveTextContent(task.title);
    });
  });

  it('render without tasks', () => {
    const { container } = renderPage({ taskTitle: 'TDD공부하기', tasks: [] });

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('calls handleChangeTaskTitle', () => {
    const { getByRole } = renderPage({ taskTitle: 'TDD공부하기', tasks: sampleTasks });

    fireEvent.change(getByRole('textbox'), { target: { value: '운동 하기' } });
    expect(handleChangeTaskTitle).toBeCalled();
  });

  it('calls handleClickAddTask', () => {
    const { getByText } = renderPage({ taskTitle: 'TDD공부하기', tasks: sampleTasks });
    const button = getByText('추가');

    fireEvent.click(button);
    expect(handleClickAddTask).toBeCalled();
  });

  it('calls handleClickDeleteTask', () => {
    const { container, getAllByText } = renderPage({ taskTitle: 'TDD공부하기', tasks: sampleTasks });

    expect(container).toHaveTextContent('운동하기');
    expect(container).toHaveTextContent('공부하기');
    expect(handleClickDeleteTask).not.toBeCalled();

    sampleTasks.forEach((task, index) => {
      fireEvent.click(getAllByText('완료')[index]);
      expect(handleClickDeleteTask).toBeCalledWith(task.id);
    });
  });
});
