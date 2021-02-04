import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  function renderApp() {
    return render(<App />);
  }

  it('초기 상태 확인. input, 할일목록, 완료버튼을 모두 표시한다.', () => {
    const {
      container,
      getByLabelText,
      getByPlaceholderText,
      getByText,
    } = renderApp({
    });

    expect(container).toHaveTextContent('할 일이 없어요!');

    expect(getByLabelText('할 일')).toBeInTheDocument();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
    expect(getByText('추가')).toBeInTheDocument();
  });

  it('input의 값을 변경하면 input의 값이 변경된다', () => {
    const { getByPlaceholderText } = renderApp();

    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '인풋 작성',
      },
    });

    expect(input.value).toBe('인풋 작성');
  });

  it('input을 입력하고 추가 버튼을 누르면 목록에 할일이 추가되고, input창은 리셋된다.', () => {
    const { container, getByText, getByPlaceholderText } = renderApp();

    const addButton = getByText('추가');

    expect(container).toHaveTextContent('할 일이 없어요!');

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '할일 추가!!',
      },
    });

    fireEvent.click(addButton);

    expect(container).toHaveTextContent('할일 추가!!');

    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeInTheDocument();
  });

  it('완료버튼 클릭하면 할일은 삭제된다.', () => {
    const {
      container,
      getAllByText,
      getByText,
      getByPlaceholderText,
    } = renderApp();

    const addButton = getByText('추가');

    expect(container).toHaveTextContent('할 일이 없어요!');

    fireEvent.change(getByPlaceholderText('할 일을 입력해 주세요'), {
      target: {
        value: '할일!',
      },
    });

    fireEvent.click(addButton);

    expect(container).toHaveTextContent('할일!');
    expect(container).not.toHaveTextContent('할 일이 없어요!');
    expect(getAllByText('완료')).toHaveLength(1);

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('할일!');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
