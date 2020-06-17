import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

describe('<App /> ', () => {
  it('처음 App 컴포넌트가 렌더링 될 때 화면 테스트', () => {
    const { getByText } = render(<App />);
    getByText('할 일이 없어요!');
  });

  it('input value 변화 테스트', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    // value를 수정한다.
    fireEvent.change(input, {
      target: {
        value: '자바스크립트 공부하기',
      },
    });
    expect(input.value).toBe('자바스크립트 공부하기');
  });

  it('할 일 추가 테스트', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    // value를 수정한다.
    fireEvent.change(input, {
      target: {
        value: '자바스크립트 공부하기',
      },
    });
    // 추가 버튼을 누른다.
    fireEvent.click(getByText('추가'));
    // 할 일 목록이 추가된다.
    getByText('자바스크립트 공부하기');
    getByText('완료');
  });

  it('할 일 삭제 테스트', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('할 일을 입력해 주세요');

    // value를 수정한다.
    fireEvent.change(input, {
      target: {
        value: '자바스크립트 공부하기',
      },
    });
    // 추가 버튼을 누른다.
    fireEvent.click(getByText('추가'));
    // 할 일 목록이 추가된다.
    const task = getByText('자바스크립트 공부하기');
    const removeButton = getByText('완료');
    // 완료 버튼을 클릭하면
    fireEvent.click(removeButton);
    // 페이지에서 사라진다.
    expect(task).not.toBeInTheDocument();
  });
});
