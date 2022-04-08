import { render, fireEvent } from '@testing-library/react';
import Page from './Page';

const onChangeTitle = jest.fn();
const onClickAddTask = jest.fn();

const onClickDeleteTask = jest.fn();

const defaultTasks = [
  { id: 100, title: '밥먹기' },
];

const renderPage = ({ tasks = defaultTasks }) => render((
  <Page
    taskTitle="tasks"
    onChangeTitle={onChangeTitle}
    onClickAddTask={onClickAddTask}
    tasks={tasks}
    onClickDeleteTask={onClickDeleteTask}
  />
));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Page', () => {
  it('renders title', () => {
    const { container } = renderPage({});

    expect(container).toHaveTextContent('To-do');
  });

  it('listens for change event to chagne the task title', () => {
    const { getByPlaceholderText } = renderPage({});
    expect(onChangeTitle).not.toHaveBeenCalled();

    fireEvent.change(
      getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '할 일을 입력했습니다.' } },
    );

    expect(onChangeTitle).toHaveBeenCalledWith('할 일을 입력했습니다.');
  });

  it('renders "추가" button to add task', () => {
    const { container, getByText } = renderPage({});

    expect(container).toHaveTextContent('추가');

    expect(onClickAddTask).not.toHaveBeenCalled();

    fireEvent.click(getByText('추가'));

    expect(onClickAddTask).toHaveBeenCalled();
  });

  context('without the task', () => {
    it('renders "할 일이 없어요!"', () => {
      const { container } = renderPage({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders task title', () => {
      const { container } = renderPage({});

      expect(container).toHaveTextContent('밥먹기');
    });

    it('renders "완료" buttons to delete the task', () => {
      const { container, getByText } = renderPage({});

      expect(container).toHaveTextContent('완료');

      expect(onClickDeleteTask).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(onClickDeleteTask).toBeCalled();
    });
  });
});
