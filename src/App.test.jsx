import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  function renderApp() {
    return render((<App />));
  }

  it('App이 렌더링된다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('추가');
  });

  it('추가 버튼을 누르면 handleClick 함수가 실행된다', () => {
    const { getByText } = renderApp();

    // console.log(fireEvent.click(getByText('추가')));

    expect(handleClick).not.toBeCalled();

    fireEvent.click(getByText('추가'));

    expect(handleClick).toBeCalled();
  });

  it('handleChange 함수가 실행된다', () => {
    const { getByLabelText } = renderApp();

    const input = getByLabelText('할 일');

    fireEvent.change(input, { target: { value: 'TDD 하기' } });

    expect(handleChange).toBeCalled();
  });

  it('완료 버튼을 누르면 handleClick 함수가 실행된다.', () => {
    const { getAllByText } = renderApp();

    const buttons = getAllByText('완료');

    fireEvent.click(buttons[0]);

    expect(handleClick).toBeCalled();
  });
});
