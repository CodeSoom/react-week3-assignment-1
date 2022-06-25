import { fireEvent, render } from '@testing-library/react';

import Page from './Page';

import TASKS from './fixtures/tasks';

describe('<Page />', () => {
  const LABEL_TEXT = '할 일';

  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const handleClickAddTask = jest.fn();

  function renderPage({ taskTitle = '', tasks = [] } = {}) {
    return render((
      <Page
        tasks={tasks}
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Input이 보인다.', () => {
    const { getByLabelText } = renderPage();

    expect(getByLabelText(LABEL_TEXT)).toBeInTheDocument();
  });

  it('Input에 현재 입력중인 값이 보인다.', () => {
    const taskTitle = '입력값';

    const { getByLabelText } = renderPage({
      taskTitle,
    });

    expect(getByLabelText(LABEL_TEXT)).toHaveValue(taskTitle);
  });

  describe('input에 할 일을 입력', () => {
    it('handleChangeTitle가 호출된다.', () => {
      const { getByLabelText } = renderPage();

      expect(handleChangeTitle).not.toBeCalled();

      fireEvent.change(getByLabelText(LABEL_TEXT), {
        target: {
          value: '입력값',
        },
      });

      expect(handleChangeTitle).toBeCalled();
    });
  });

  describe('추가 버튼 클릭', () => {
    it('handleClickAddTask가 호출된다.', () => {
      const { getByText } = renderPage();

      expect(handleClickAddTask).not.toBeCalled();

      fireEvent.click(getByText('추가'));

      expect(handleClickAddTask).toBeCalled();
    });
  });

  context('할 일 목록이 없으면', () => {
    it('"할 일이 없어요!" 텍스트가 보인다.', () => {
      const { container } = renderPage({
        tasks: [],
      });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('할 일 목록이 있으면', () => {
    it('할 일 목록이 보인다.', () => {
      const { container } = renderPage({
        tasks: TASKS,
      });

      TASKS.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });
  });

  describe('완료 버튼 클릭', () => {
    it('handleClickDeleteTask가 호출된다.', () => {
      const { getAllByText } = renderPage({
        tasks: TASKS,
      });

      const completeButtons = getAllByText('완료');

      fireEvent.click(completeButtons[0]);

      expect(handleClickDeleteTask).toBeCalled();
    });
  });
});
