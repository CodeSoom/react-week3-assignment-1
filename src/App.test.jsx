import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const handleDelete = jest.fn();

  const appElement = () => render((<App />));

  it('App 컴포넌트가 랜더링된다', () => {
    const { container } = appElement();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('추가');
  });

  context('추가 버튼을 누르면', () => {
    it('할 일이 추가된다', () => {
      const taskTitle = '입력 값';

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

  context('완료 버튼을 누르면', () => {
    it(' 할 일이 삭제된다', () => {

    });
  });

  context('할 일 목록이 없으면', () => {
    it('할 일이 없어요! 메시지가 보인다', () => {

    });
  });
});
