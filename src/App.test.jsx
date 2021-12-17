import { render } from '@testing-library/react';
import App from './App';

test('아무 것도 추가하지 않았을 때 초기 상태 확인', () => {
  const { container, getByPlaceholderText } = render(
    <App />,
  );

  const inputTodo = getByPlaceholderText('할 일을 입력해 주세요');

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('할 일이 없어요!');
  expect(inputTodo).toHaveAttribute('value', '');
});
