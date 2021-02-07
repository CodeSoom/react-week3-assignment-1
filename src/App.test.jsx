import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('할 일이 없으면 할 일이 없어요!를 보여준다.', () => {
    const { container } = render((
      <App />
    ));
    expect(container).toHaveTextContent('To-do');
    expect(container).toHaveTextContent('할 일이 없어요!');
  });

  it('할 일 목록을 표시한다.', () => {
    const { getByPlaceholderText } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '할 일을 입력중입니다.' } });
    expect(input.value).toBe('할 일을 입력중입니다.');
  });

  it('할 일을 등록하면 리스트에 뜬다.', () => {
    const { container, getByText, getByPlaceholderText } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '할 일 1번' } });
    expect(input.value).toBe('할 일 1번');
    fireEvent.click(getByText('추가'));
    expect(container).toHaveTextContent('할 일 1번');
  });

  it('할 일을 등록하면 리스트에 뜨고 input text는 지운다.', () => {
    const { getByText, getByPlaceholderText } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '할 일 1번' } });
    expect(input.value).toBe('할 일 1번');
    fireEvent.click(getByText('추가'));
    expect(input.value).toBe('');
  });

  it('할 일을 두 번 등록하면 두 개가 리스트에 출력된다:.', () => {
    const { getAllByRole, getByText, getByPlaceholderText } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '할 일 1번' } });
    fireEvent.click(getByText('추가'));
    fireEvent.change(input, { target: { value: '할 일 2번' } });
    fireEvent.click(getByText('추가'));

    expect(getAllByRole('listitem').length).toBe(2);
  });

  it('할 일 옆에 삭제버튼을 누르면 해당 할 일이 삭제 된다.', () => {
    const {
      container, getByText, getByPlaceholderText, getAllByText,
    } = render((
      <App />
    ));
    const input = getByPlaceholderText('할 일을 입력해 주세요');
    fireEvent.change(input, { target: { value: '할 일 1번' } });
    expect(input.value).toBe('할 일 1번');
    fireEvent.click(getByText('추가'));
    expect(container).toHaveTextContent('할 일 1번');

    fireEvent.change(input, { target: { value: '할 일 2번' } });
    expect(input.value).toBe('할 일 2번');
    fireEvent.click(getByText('추가'));
    expect(container).toHaveTextContent('할 일 2번');

    fireEvent.click(getAllByText('완료')[1]);
    expect(container).not.toHaveTextContent('할 일 2번');
    expect(container).toHaveTextContent('할 일 1번');
  });
});
