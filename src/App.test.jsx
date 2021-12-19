import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('"추가" 버튼이 있다.', () => {
    const { getByText } = renderApp();
    expect(getByText('추가')).not.toBeNull();
  });

  it('할 일을 추가한다.', () => {
    const { container, getByLabelText, getByText } = renderApp();
    const input = getByLabelText('할 일');
    const todo = '운동 1시간 하기';

    fireEvent.change(input, { target: { value: todo } });

    expect(input.value).toBe(todo);

    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent(todo);
    expect(input.value).toBe('');
  });

  it('할 일을 완료처리 한다.', () => {
    const { container, getByLabelText, getByText } = renderApp();
    const todo = 'Task-1';
    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: todo } });

    fireEvent.click(getByText('추가'));

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent(todo);
  });
});
