import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App 컴포넌트 관련 테스트', () => {
  it('App컴포넌트 초기화 상태모습 확인하기', () => {
    const { container, queryByText, queryByPlaceholderText } = render(<App />);

    const input = queryByPlaceholderText('할 일을 입력해 주세요');
    const button = queryByText('추가');
    const list = queryByText('할 일이 없어요!');

    expect(container).toHaveTextContent('To-do');
    expect(input).toHaveAttribute('value', '');
    expect(button).not.toBeNull();
    expect(list).not.toBeNull();
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('input에 할 일을 입력하면 입력값으로 바뀐다', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });

    expect(input).toHaveAttribute('value', '뭐라도 하기');
  });

  it('button을 클릭하면 입력값이 추가된다', () => {
    const { getByText, getByPlaceholderText, container } = render(<App />);
    const button = getByText('추가');
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });

    fireEvent.click(button);

    expect(container).toHaveTextContent('뭐라도 하기');
  });

  it('완료버튼을 누르면 할 일이 삭제되어야 한다', () => {
    const { getByText, getByPlaceholderText, container } = render(<App />);
    const button = getByText('추가');
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });

    fireEvent.click(button);

    fireEvent.click(getByText('완료'));

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
