import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const todoInWriting = {
    target: { value: '숨쉬기' },
  };

  const TASKS = [
    {
      id: 1,
      title: '숨쉬기',
    },
    {
      id: 2,
      title: '아무것도 안하기',
    },
  ];

  function rendererApp() {
    return render((
      <App />
    ));
  }

  function renderAppWithInputValue() {
    const result = rendererApp();

    const { getByLabelText } = result;

    fireEvent.change(getByLabelText('할 일'), todoInWriting);

    return result;
  }

  function renderAppWithTasks() {
    const result = rendererApp();

    const { getByRole, getByText } = result;

    TASKS.forEach((task) => {
      fireEvent.change(getByRole('textbox'), { target: { value: task.title } });

      fireEvent.click(getByText('추가'));
    });

    return result;
  }

  describe('input', () => {
    context('input이 렌더링 되었을 때', () => {
      it('input이 보여집니다.', () => {
        const { getByPlaceholderText } = rendererApp();

        expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
      });
    });

    context('input에 숨쉬기를 입력하면', () => {
      it('input의 value가 숨쉬기가 됩니다.', () => {
        const { getByLabelText } = rendererApp();

        const input = getByLabelText('할 일');

        fireEvent.change(input, todoInWriting);

        expect(input).toHaveDisplayValue('숨쉬기');
      });
    });

    context('"추가" 버튼을 클릭하면', () => {
      it('value가 "" 이됩니다.', () => {
        const { getByLabelText, getByText } = renderAppWithInputValue();

        fireEvent.click(getByText('추가'));

        expect(getByLabelText('할 일')).toHaveDisplayValue('');
      });

      it('todo가 추가됩니다.', () => {
        const { container, getByText } = renderAppWithInputValue();

        fireEvent.click(getByText('추가'));

        expect(container).toHaveTextContent(todoInWriting.target.value);
      });
    });
  });

  describe('list', () => {
    context('list가 렌더링되면', () => {
      it('해당 tasks의 title이 보입니다.', () => {
        const { container } = renderAppWithTasks();

        TASKS.forEach((task) => {
          expect(container).toHaveTextContent(task.title);
        });
      });
    });

    context('"완료" 버튼을 클릭하면', () => {
      it('해당 task가 삭제됩니다.', () => {
        const { container, getAllByText } = renderAppWithTasks();

        fireEvent.click(getAllByText('완료')[0]);

        expect(container).not.toHaveTextContent(TASKS[0].title);
      });
    });
  });
});
