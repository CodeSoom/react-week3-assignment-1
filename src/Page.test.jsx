import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const onChangeTitle = jest.fn();
  const onClickAddTask = jest.fn();
  const onClickDeleteTask = jest.fn();

  const todoInWriting = {
    target: {
      value: '숨쉬기',
    },
  };

  const TASK = [
    {
      id: 1,
      title: '숨쉬기',
    },
    {
      id: 2,
      title: '아무것도 안하기',
    },
  ];

  const EMPTYTASK = [];

  function rendererPage({ tasks, taskTitle }) {
    return render((
      <Page
        tasks={tasks}
        taskTitle={taskTitle}
        onChangeTitle={onChangeTitle}
        onClickAddTask={onClickAddTask}
        onClickDeleteTask={onClickDeleteTask}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('Page가 렌더링되면', () => {
    it('To-do가 보입니다.', () => {
      const { container } = rendererPage({ tasks: EMPTYTASK });

      expect(container).toHaveTextContent('To-do');
    });
  });

  describe('<Input/>', () => {
    context('Input 컴포넌트가 렌더링되면', () => {
      it('button이 보입니다.', () => {
        const { getByText } = rendererPage({ tasks: EMPTYTASK });

        expect(getByText('추가')).toBeInTheDocument();
      });

      it('input이 보입니다.', () => {
        const { getByLabelText } = rendererPage({ tasks: EMPTYTASK });

        expect(getByLabelText('할 일').value).toBe('');
      });
    });

    describe('input', () => {
      context('할 일을 입력하면', () => {
        it('onChangeTitle이 호출됩니다.', () => {
          const { getByPlaceholderText } = rendererPage({ tasks: EMPTYTASK, taskTitle: '' });

          const input = getByPlaceholderText('할 일을 입력해 주세요');

          fireEvent.change(input, todoInWriting);

          expect(onChangeTitle).toBeCalled();
        });
      });
    });

    describe('button', () => {
      context('유저가 "추가" 버튼을 클릭하면', () => {
        it('onClickAddTask 함수가 호출됩니다.', () => {
          const { getByText } = rendererPage({ tasks: EMPTYTASK });

          fireEvent.click(getByText('추가'));

          expect(onClickAddTask).toBeCalled();
        });
      });
    });
  });

  describe('List컴포넌트가 렌더링 되면', () => {
    describe('list', () => {
      context('tasks가 비어있지 않을 시', () => {
        it('해당 tasks의 title이 보입니다.', () => {
          const { container } = rendererPage({ tasks: TASK });

          TASK.forEach((task) => {
            expect(container).toHaveTextContent(task.title);
          });
        });
      });

      context('tasks가 비어있을 시', () => {
        it('"할 일이 없어요!"가 출력됩니다.', () => {
          const { container } = rendererPage({ tasks: EMPTYTASK });

          expect(container).toHaveTextContent('할 일이 없어요');
        });
      });
    });

    describe('button', () => {
      context('유저가 "완료" 버튼을 클릭하면', () => {
        it('onClickDelete가 호출됩니다.', () => {
          const { getAllByText } = rendererPage({ tasks: TASK });

          fireEvent.click(getAllByText('완료')[0]);

          expect(onClickDeleteTask).toBeCalledTimes(1);
        });
      });
    });
  });

  describe('Item컴포넌트가 렌더링되면', () => {
    describe('li', () => {
      context('tasks가 비어있지 않을 시', () => {
        it('해당 tasks의 title이 보입니다.', () => {
          const { container } = rendererPage({ tasks: TASK });

          expect(container).toHaveTextContent('숨쉬기');
        });
      });

      context('tasks가 비어있을 시', () => {
        it('"할 일이 없어요!" 가 출력됩니다.', () => {
          const { container } = rendererPage({ tasks: EMPTYTASK });

          expect(container).toHaveTextContent('할 일이 없어요!');
        });
      });
    });

    describe('button', () => {
      context('완료버튼을 클릭하면', () => {
        it('onClickDelete가 호출됩니다.', () => {
          const { getAllByText } = rendererPage({ tasks: TASK });

          fireEvent.click(getAllByText('완료')[0]);
          fireEvent.click(getAllByText('완료')[1]);

          expect(onClickDeleteTask).toBeCalledTimes(2);
        });
      });
    });
  });
});
