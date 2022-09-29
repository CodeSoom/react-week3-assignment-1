import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('AppTest', () => {
  const { container, getByText, getByPlaceholderText } = render((
    <App />
  ));

  const temp = getByPlaceholderText('할 일을 입력해 주세요');

  fireEvent.change(temp, { target: { value: '이거 해야지~!' } });

  expect(temp).toHaveAttribute('value', '이거 해야지~!');

  fireEvent.click(getByText('추가'));

  expect(container).toHaveTextContent('이거 해야지~!');

  fireEvent.click(getByText('완료'));

  expect(container).not.toHaveTextContent('이거 해야지~!');
});
