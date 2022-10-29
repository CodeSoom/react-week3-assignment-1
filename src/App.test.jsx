import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const appElement = () => render((<App />));

  const taskTitle = '입력 값';

  it('App 컴포넌트가 랜더링된다', () => {
    const { container } = appElement();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('추가');
  });

  context('할 일이 있을 시', () => {
    it('"삭제" 버튼이 랜더링된다', () => {
      const { getByLabelText, getByText, container } = appElement();
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });

      const addTaskButton = getByText('추가');

      fireEvent.click(addTaskButton);

      expect(container).toHaveTextContent(taskTitle);

      const deleteButton = getByText('완료');

      fireEvent.click(deleteButton);

      expect(container).not.toHaveTextContent(taskTitle);
    });
  });

  context('할 일이 없을 시', () => {
    it('할 일이 없어요! 메시지가 보인다', () => {
      const tasks = [];
      const { getByText } = appElement(tasks);

      expect(getByText(/할 일이 없어요!/)).not.toBeNull();
    });

    it('값을 입력하면 "추가" 버튼이 랜더링 된다', () => {
      const { getByLabelText, getByText, container } = appElement();
      const input = getByLabelText('할 일');

      fireEvent.change(input, {
        target: {
          value: taskTitle,
        },
      });

      const addTaskButton = getByText('추가');

      fireEvent.click(addTaskButton);

      expect(container).toHaveTextContent(taskTitle);
    });
  });
});
