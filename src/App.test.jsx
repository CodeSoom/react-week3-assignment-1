import { fireEvent, render } from '@testing-library/react';

import { tasks } from '../fixtures/tasks';

import App from './App';

describe('App Component', () => {
  const taskTitle = '코드숨 과제하기';
  const renderComponent = () => render((
    <App />
  ));

  context('Todo Appender', () => {
    it('할 일을 입력할 수 있다.', () => {
      const { getByPlaceholderText } = renderComponent();
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });

      expect(input).toHaveAttribute('value', taskTitle);
    });

    it('할 일을 입력 후 추가 버튼을 클릭하면, 입련 란이 빈 값이 된다.', () => {
      const { getByPlaceholderText, getByRole } = renderComponent();
      const input = getByPlaceholderText('할 일을 입력해 주세요');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });
      fireEvent.click(getByRole('button', { name: '추가' }));

      expect(input).toHaveAttribute('value', '');
    });
  });

  it('task 를 추가할 수 있다.', () => {
    const { container, getByPlaceholderText, getByRole } = renderComponent();
    tasks.forEach((task) => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: {
          value: task,
        },
      });
      fireEvent.click(getByRole('button', { name: '추가' }));
    });

    expect(container).not.toHaveTextContent('할 일이 없어요');
    tasks.forEach((task) => {
      expect(container).toHaveTextContent(task);
    });
  });

  it('task 를 삭제할 수 있다.', () => {
    const {
      container, getByPlaceholderText, getByRole, getAllByRole,
    } = renderComponent();
    tasks.forEach((task) => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
        target: {
          value: task,
        },
      });
      fireEvent.click(getByRole('button', { name: '추가' }));
    });
    const buttons = getAllByRole('button', { name: '완료' });

    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[1]);

    expect(container).not.toHaveTextContent(tasks[1].title);
  });
});
