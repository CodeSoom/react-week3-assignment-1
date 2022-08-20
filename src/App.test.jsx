import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App component', () => {
  it('renders Page component', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText('To-do')).not.toBeNull();
    expect(getByText('추가')).not.toBeNull();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveAttribute('type', 'text');
    expect(getByText('할 일이 없어요!')).not.toBeNull();
  });

  it('renders input to listen to change event', () => {
    const { getByPlaceholderText } = render(<App />);

    const text = '코드숨 리액트 11기 화이팅!';

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: text } });

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue(text);
  });

  it('renders add button to listen to click event', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const tasks = ['Task-1', 'Task-2', 'Task-3'];

    tasks.forEach((task) => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: task } });
      fireEvent.click(getByText('추가'));

      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
      expect(getByText(task)).not.toBeNull();
    });
  });

  it('renders delete button to listen to click event', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const tasks = ['Task-1', 'Task-2', 'Task-3'];

    tasks.forEach((task) => {
      fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: task } });
      fireEvent.click(getByText('추가'));
    });

    // console.log(getAllByText('완료'));
    // fireEvent.click(getByText('완료'));
  });
});
