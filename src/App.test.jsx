import { render, fireEvent } from '@testing-library/react';
import { createElement } from 'react';

import App from './App';

test('App컴포넌트 초기화 상태', () => {
  const { container, getByPlaceholderText } = render((
    <App />
  ));

  expect(container).toHaveTextContent('To-do');
  expect(container.hasChildNodes('input')).toBe(true);
  expect(container.hasChildNodes('button')).toBe(true);
  expect(container).toHaveTextContent('추가');

  const input = getByPlaceholderText('할 일을 입력해 주세요');
  expect(input).toHaveAttribute('value', '');

  expect(container.hasChildNodes('list')).toBe(true);
  expect(container).toHaveTextContent('할 일이 없어요!');
});

describe('input', () => {
  it('input에 할 일을 입력하면 입력값으로 바뀐다', () => {
    // given : 이 테스트를 수행하기 위해 주어저야하는 상황 (이거일때)
    const { getByPlaceholderText } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    // when : 테스트를 수행 (이렇게 하면)
    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });
    // then : 테스트를 수행했을때 예상하는 결과값 (이렇게 되어야한다)
    expect(input).toHaveAttribute('value', '뭐라도 하기');
  });
});

describe('button', () => {
  it('button을 클릭하면 입력값이 추가된다', () => {
    // given
    const { getByText, getByPlaceholderText, container } = render(<App />);
    const button = getByText('추가');
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });
    // when
    fireEvent.click(button);
    // then
    expect(container).toHaveTextContent('뭐라도 하기');
  });
});

describe('완료버튼', () => {
  it('완료버튼을 누르면 할 일이 삭제되어야 한다', () => {
    // given
    const { getByText, getByPlaceholderText, container } = render(<App />);
    const button = getByText('추가');
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });
    fireEvent.click(button);
    // when
    fireEvent.click(getByText('완료'));
    // then
    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
