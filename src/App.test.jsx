import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  test('Page 컴포넌트 확인', () => {
    const { getByText, getByPlaceholderText } = render((
      <App />
    ));

    expect(getByText('할 일')).toBeTruthy();
    expect(getByPlaceholderText('할 일을 입력해 주세요')).toBeTruthy();
    expect(getByText('추가')).toBeTruthy();
    expect(getByText('할 일이 없어요!')).toBeTruthy();
  });

  test('할 일 입력', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const button = getByText('추가');

    expect(input).toHaveAttribute('value', '');

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });
    fireEvent.click(button);

    expect(input).toHaveAttribute('value', '');
    expect(container).toHaveTextContent('뭐라도 하기');
  });

  test('할 일 완료', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));

    const input = getByPlaceholderText('할 일을 입력해 주세요');
    const buttonAdd = getByText('추가');

    expect(input).toHaveAttribute('value', '');

    fireEvent.change(input, { target: { value: '뭐라도 하기' } });
    fireEvent.click(buttonAdd);

    expect(input).toHaveAttribute('value', '');
    expect(container).toHaveTextContent('뭐라도 하기');

    fireEvent.click(getByText('완료'));

    expect(container).not.toHaveTextContent('뭐라도 하기');
  });
});
