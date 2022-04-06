import { render, fireEvent, getByText as getByTextWithContainer } from '@testing-library/react';
import Page from './Page';

const onChangeTitle = jest.fn();
const onClickAddTask = jest.fn();

const onClickDeleteTask = jest.fn();

const tasks = [
  { id: 100, title: '밥먹기' },
  { id: 101, title: '테스트 코드 짜기' },
  { id: 102, title: 'PR 날리기' },
];

const customRender = () => render((
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
  it('render title', () => {
    const { container } = customRender();

    expect(container).toHaveTextContent('To-do');
  });

  it('Input', () => {
    const { getByPlaceholderText, getByText } = customRender();
    expect(onChangeTitle).not.toHaveBeenCalled();

    fireEvent.change(
      getByPlaceholderText('할 일을 입력해 주세요'),
      { target: { value: '할 일을 입력했습니다.' } },
    );

    expect(onChangeTitle).toHaveBeenCalledWith('할 일을 입력했습니다.');

    expect(onClickAddTask).not.toHaveBeenCalled();

    fireEvent.click(getByText('추가'));

    expect(onClickAddTask).toHaveBeenCalled();
  });

  it('List', () => {
    const { container, getByText } = customRender();

    expect(container).toHaveTextContent('밥먹기');
    expect(container).toHaveTextContent('테스트 코드 짜기');
    expect(container).toHaveTextContent('PR 날리기');

    expect(onClickDeleteTask).not.toBeCalled();

    fireEvent.click(
      getByTextWithContainer(getByText('밥먹기'), '완료'),
    );

    expect(onClickDeleteTask).toBeCalledTimes(1);

    fireEvent.click(
      getByTextWithContainer(getByText('테스트 코드 짜기'), '완료'),
    );

    expect(onClickDeleteTask).toBeCalledTimes(2);

    fireEvent.click(
      getByTextWithContainer(getByText('PR 날리기'), '완료'),
    );

    expect(onClickDeleteTask).toBeCalledTimes(3);
  });
});
