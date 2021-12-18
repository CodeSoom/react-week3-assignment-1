import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => (
    render((
      <App />
    ))
  );

  const handleChangeTitle = jest.fn();
  const handleClickAddTask = jest.fn();
  const handleClickDeleteTask = jest.fn();

  it('renders initial app', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('litens input change event', () => {
    const { getByPlaceholderText } = renderApp();
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    input.addEventListener('change', handleChangeTitle);

    fireEvent.change(input, { target: { value: '코드숨' } });

    expect(handleChangeTitle).toBeCalled();
    expect(input).toHaveAttribute('value', '코드숨');
  });

  it('litens "추가" and "완료" button click event', () => {
    const { container, getByText, getByPlaceholderText } = renderApp();
    const addButton = getByText('추가');
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    addButton.addEventListener('click', handleClickAddTask);

    fireEvent.change(input, { target: { value: '코드숨' } });
    fireEvent.click(addButton);

    expect(handleClickAddTask).toBeCalled();
    expect(container).toHaveTextContent('코드숨');

    const deleteButton = getByText('완료');
    deleteButton.addEventListener('click', handleClickDeleteTask);

    fireEvent.click(deleteButton);

    expect(handleClickDeleteTask).toBeCalled();
    expect(container).not.toHaveTextContent('코드숨');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
