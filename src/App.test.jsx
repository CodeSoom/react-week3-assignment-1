import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App/>', () => {
  it('renders <Page/>', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('changes input value', () => {
    const { getByPlaceholderText } = render(<App />);

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: 'Changed' } });

    expect(input.value).toBe('Changed');
  });

  it('clicks "추가" button to display task', () => {
    const { container, getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: 'New task' } });

    const addButton = getByText('추가');
    fireEvent.click(addButton);

    expect(input.value).toBe('');
    expect(container).not.toHaveTextContent('할 일이 없어요!');

    expect(container).toHaveTextContent('New task');
    expect(container).toHaveTextContent('완료');
  });

  it('clicks "완료" button to delete task', () => {
    const { container, getByPlaceholderText, getByText } = render(<App />);

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: 'New task' } });

    const addButton = getByText('추가');
    fireEvent.click(addButton);

    const deleteButton = getByText('완료');
    fireEvent.click(deleteButton);

    expect(container).not.toHaveTextContent('New task');
    expect(container).not.toHaveTextContent('완료');

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
