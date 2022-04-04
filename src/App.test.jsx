import { render, fireEvent } from '@testing-library/react';

import App from './App';

test('App', () => {
  const { container, getByText, getByRole } = render((
    <App />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container).toHaveTextContent('추가');
  expect(container).toHaveTextContent('할 일이 없어요!');

  fireEvent.change(getByRole('textbox'), { target: { value: '신나게 놀기' } });
  fireEvent.click(getByText('추가'));

  expect(container).toHaveTextContent('신나게 놀기');
  expect(container).toHaveTextContent('완료');

  fireEvent.click(getByText('완료'));

  expect(container).not.toHaveTextContent('신나게 놀기');
});
