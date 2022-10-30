import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render((<App />));
  }

  it('App이 렌더링된다.', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
    expect(container).toHaveTextContent('추가');
  });

  it('할 일을 입력시 handleChange 함수가 실행되어 input의 value가 변경된다.', () => {
    const { getByLabelText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: 'TDD 하기' },
    });

    expect(getByLabelText('할 일').value).toBe('TDD 하기');

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: '집에 가기' },
    });

    expect(getByLabelText('할 일').value).toBe('집에 가기');
  });

  it('추가 버튼을 누르면 handleClickAdd 함수가 실행되어 할 일이 렌더링된다.', () => {
    const { container, getByLabelText, getByText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: 'TDD 하기' },
    });

    expect(getByLabelText('할 일').value).toBe('TDD 하기');

    fireEvent.click(getByText('추가'));

    expect(container).toHaveTextContent('TDD 하기');
  });

  it('완료 버튼을 누르면 handleClickDelete 함수가 실행되어 추가되었던 할 일이 삭제된다.', () => {
    const { container, getByLabelText, getByText } = renderApp();

    fireEvent.change(getByLabelText('할 일'), {
      target: { value: 'TDD 하기' },
    });

    fireEvent.click(getByText('추가'));

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('TDD 하기');
  });
});
