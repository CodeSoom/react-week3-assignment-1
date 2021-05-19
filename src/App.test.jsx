import { render, fireEvent } from '@testing-library/react';

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
    const { getByPlaceholderText } = render((
      <App />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toHaveAttribute('value', '');

    fireEvent.change(input, {
      target: {
        value: '뭐라도 하기',
      },
    });

    expect(input).toHaveAttribute('value', '뭐라도 하기');
  });
});
