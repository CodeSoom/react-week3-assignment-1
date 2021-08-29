import { fireEvent, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders "할 일이 없어요!" by default', () => {
    const { getByText } = render((
      <App />
    ));

    expect(getByText(/추가/)).not.toBeNull();
    expect(getByText(/할 일이 없어요!/)).not.toBeNull();
  });

  it('changes input value', () => {
    const { getByPlaceholderText } = render((
      <App />
    ));

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/);

    fireEvent.change(inputElement, { target: { value: 'a' } });
    expect(inputElement).toHaveAttribute('value', 'a');
  });

  it('adds a new task', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));

    expect(container).not.toHaveTextContent(/완료/);

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/);

    fireEvent.change(inputElement, { target: { value: '과제1' } });

    fireEvent.click(getByText(/추가/));
    expect(container).toHaveTextContent(/완료/);
  });

  it('deletes a task', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));

    const inputElement = getByPlaceholderText(/할 일을 입력해 주세요/);

    fireEvent.change(inputElement, { target: { value: '과제1' } });
    fireEvent.click(getByText(/추가/));

    const newTask = getByText(/과제1/);

    expect(container).toContainElement(newTask);
    fireEvent.click(getByText(/완료/));
    expect(container).not.toContainElement(newTask);
  });
});
