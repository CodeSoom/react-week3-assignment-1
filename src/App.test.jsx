import { render, fireEvent } from '@testing-library/react';

import App from './App';

import TASKS from './fixtures/tasks';

describe('<App />', () => {
  function renderApp() {
    return render((
      <App />
    ));
  }

  it('앱의 제목이 보인다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
  });

  it('할 일을 입력할 수 있는 input이 보인다.', () => {
    const { getByLabelText } = renderApp();

    expect(getByLabelText('할 일')).toBeInTheDocument();
  });

  describe('할 일 입력', () => {
    it('input의 값이 입력한 값으로 변한다.', () => {
      const { getByLabelText } = renderApp();

      const taskTitle = '입력중인 값';

      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });

      expect(input).toHaveValue(taskTitle);
    });
  });

  describe('"추가" 버튼 클릭', () => {
    it('할 일이 추가된다.', () => {
      const taskTitle = '입력중인 값';

      const { getByLabelText, getByText, container } = renderApp();

      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });

      const addButton = getByText('추가');

      fireEvent.click(addButton);

      expect(container).toHaveTextContent(taskTitle);
    });
  });

  context('할 일 목록이 있으면', () => {
    function renderAppWithTasks(tasks = []) {
      const utils = renderApp();

      const { getByLabelText, getByText } = utils;

      const input = getByLabelText('할 일');
      const addButton = getByText('추가');

      tasks.forEach(({ title }) => {
        fireEvent.change(input, {
          target: { value: title },
        });

        fireEvent.click(addButton);
      });

      return utils;
    }

    it('할 일 목록이 화면에 보인다.', () => {
      const { container } = renderAppWithTasks(TASKS);

      TASKS.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    describe('"완료" 버튼 클릭', () => {
      it('할 일이 삭제된다.', () => {
        const { getAllByText, queryByText } = renderAppWithTasks(TASKS);

        const completeButtons = getAllByText('완료');

        fireEvent.click(completeButtons[0]);

        expect(queryByText(TASKS[0].title)).not.toBeInTheDocument();
      });
    });
  });

  context('할 일 목록이 없으면', () => {
    it('할 일이 없다는 메시지가 보인다.', () => {
      const { container } = renderApp();

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });
});
