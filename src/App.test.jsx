import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App component', () => {
  it('returns Page component', () => {
    const { getByText } = render(<App />);

    expect(getByText('To-do')).toBeInTheDocument();
  });

  it('changes input value', () => {
    const { getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '할 일을 적는 중',
      },
    });

    expect(input).toHaveAttribute('value', '할 일을 적는 중');
  });

  it('adds values into tasks', () => {
    const { container, getByText, getByPlaceholderText } = render(<App />);

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '추가될 할일',
      },
    });

    const addButton = getByText('추가');
    fireEvent.click(addButton);

    expect(container).toHaveTextContent('추가될 할일');
  });

  it('deletes completed task', () => {
    const { container, getByText, getByPlaceholderText } = render(<App />);

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '완료된 할일',
      },
    });

    fireEvent.click(getByText('추가'));

    getByText('완료된 할일');

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    expect(container).not.toHaveTextContent('완료된 할일');
  });
});
