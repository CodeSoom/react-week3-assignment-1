import { fireEvent, render } from '@testing-library/react';
import Page from './Page';
import TASKS from './fixtures/Task';

describe('<Page />', () => {
  const dummytasks = TASKS;
  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

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

  it('input이 보인다', () => {
    const { getByPlaceholderText } = renderPage();

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('title 이름인 To-do가 보인다', () => {
    const { container } = renderPage();

    expect(container).toHaveTextContent('To-do');
  });

  describe('<Input/>', () => {
    describe('입력할 때', () => {
      it('handleChangeTitle 함수가 호출됨', () => {
        const { getByLabelText } = renderPage();

        expect(handleChangeTitle).not.toBeCalled();

        fireEvent.change(getByLabelText('할 일'), { target: { value: '뭐라도 하기' } });

        expect(handleChangeTitle).toBeCalled();
      });
    });

    describe('"추가" 버튼을 누를 때', () => {
      it('handleClickAddTask 함수가 한 번 호출됨', () => {
        const { getByText } = renderPage();

        expect(handleClickAddTask).not.toBeCalled();

        fireEvent.click(getByText('추가'));

        expect(handleClickAddTask).toHaveBeenCalledTimes(1);
      });

      it('입력했던 할 일이 없어지고 placeholder가 보임', () => {
        const { getByText, getByPlaceholderText } = renderPage();

        fireEvent.click(getByText('추가'));

        expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      });
    });
  });

  describe('<List/>', () => {
    context('할 일이 있다면', () => {
      it('할 일 목록 내용이 보임', () => {
        const { container } = renderPage({ tasks: dummytasks });

        dummytasks.forEach((task) => {
          expect(container).toHaveTextContent(task.title);
        });
      });
    });

    context('할 일이 없다면', () => {
      it('"할 일이 없어요!" 텍스트가 보임', () => {
        const { container } = renderPage();

        expect(container).toHaveTextContent('할 일이 없어요!');
      });
    });

    describe('완료버튼을 누를 때', () => {
      it('handleClickDelete 함수가 호출됨', () => {
        const { getAllByRole } = renderPage({
          tasks: dummytasks,
        });

        expect(handleClickDeleteTask).not.toBeCalled();

        getAllByRole('button').forEach((button) => {
          fireEvent.click(button);
        });
        expect(handleClickDeleteTask).toBeCalledTimes(dummytasks.length);
      });
    });
  });
});
