import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import context from 'jest-plugin-context';

import List from './List';

describe('List', () => {
  context('task가 있을 때', () => {
    const tasks = [
      { id: 1, task: '책읽기' },
      { id: 2, task: '부동산공부' },
      { id: 3, task: '투자하기' },
    ];

    it('컴포넌트 호출 시, tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });

    it('제거 버튼 클릭 시, 해당 task가 제거된 tasks 목록을 출력합니다.', () => {
      // When
      // Then
    });
  });

  context('task가 1개 있을 때', () => {
    const tasks = [
      { id: 1, task: '책읽기' },
      { id: 2, task: '부동산공부' },
      { id: 3, task: '투자하기' },
    ];

    it('제거 버튼 클릭 시, 빈 메시지를 출력합니다.', () => {
      // When
      // Then
    });
  });

  context('tasks가 없을 때', () => {
    const tasks = [];

    it('컴포넌트 호출 시, 빈 메시지를 출력합니다.', () => {
      // When
      // Then
    });
  });
});
