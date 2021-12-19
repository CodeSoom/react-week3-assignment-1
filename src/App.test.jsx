import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => (
    render((
      <App />
    ))
  );

  it('renders initial app', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('listens input change event', () => {
    const { getByPlaceholderText } = renderApp();
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, { target: { value: '코드숨' } });

    expect(input).toHaveAttribute('value', '코드숨');
  });

  it('listens "추가" and "완료" button click event', () => {
    const { container, getByText, getByPlaceholderText } = renderApp();

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), { target: { value: '코드숨' } });
    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('코드숨');

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('코드숨');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
