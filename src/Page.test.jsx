import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import context from 'jest-plugin-context';

import Page from './Page';

describe('Page', () => {
  context('task가 있으면서 입력값이 있을 때', () => {
    const tasks = [
      { id: 1, task: '책읽기' },
      { id: 2, task: '부동산공부' },
      { id: 3, task: '투자하기' },
      { id: 4, task: '블로그 글쓰기' },
      { id: 5, task: '연애하기' },
      { id: 6, task: '동료들과 함께하기' },
    ];

    it('컴포넌트 호출 시, tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });

    it('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
      // When
      // Then
    });

    it('추가버튼 클릭 시, task를 추가한 tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });

    it('제거 버튼 클릭 시, 해당 task가 제거된 tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });
  });

  context('task가 없으면서 입력값이 없을 때', () => {
    // Given
    const { getByTestId } = render(<Page />);
    const input = getByTestId('input-task');
    const inputValue = '게임하기';

    it('컴포넌트 호출 시, 빈 메시지를 출력합니다.', () => {
      // When
      // Then
    });

    it('onChange 이벤트 발생 시, value 가 입력값이 된다.', () => {
      // When
      // Then
    });

    it('추가버튼 클릭 시, task를 추가한 tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });

    it('제거 버튼 클릭 시, 빈 메시지를 출력합니다.', () => {
      // When
      // Then
    });
  });
});
