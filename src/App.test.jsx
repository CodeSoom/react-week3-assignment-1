import React from 'react';

// import { render, fireEvent } from '@testing-library/react';

// import App from './App';

describe('App', () => {
  it('initial status', () => {
    // TODO: 아무것도 하지 않았을 때 나오는 기본 상태 test
    // placeholder 확인. '할 일을 입력해 주세요'
    // '할 일이 없어요!' 확인
  });

  it('add 3 tasks', () => {
    // TODO: task를 3개 추가하는 test
    // '아무것도 안하기' 입력
    // 추가 버튼 클릭
    // input이 빈칸이 되고 placeholder가 표시됨을 확인
    // '아무것도 안하기' 가 추가됨을 확인
    // 완료 버튼이 1개임을 확인
    //
    // '더욱 더 아무것도 안하기' 입력
    // 추가 버튼 클릭
    // input이 빈칸이 되고 placeholder가 표시됨을 확인
    // '더욱 더 아무것도 안하기' 가 추가됨을 확인
    // 완료 버튼이 2개임을 확인
    //
    // '본격적으로 아무것도 안하기' 입력
    // 추가 버튼 클릭
    // input이 빈칸이 되고 placeholder가 표시됨을 확인
    // '본격적으로 아무것도 안하기' 가 추가됨을 확인
    // 완료 버튼이 3개임을 확인
  });

  it('add empty tasks', () => {
    // TODO: 내용이 없는 task를 하나 추가하는 test
    // input이 빈칸이고 placeholder가 표시됨을 확인
    // 추가 버튼 클릭
    // input이 빈칸이고 placeholder가 표시됨을 확인
    // '' 가 추가됨을 확인
    // 완료 버튼이 4개임을 확인
  });

  it('delete empty task', () => {
    // TODO: 방금 추가했던 비어있는 task를 완료하는 test
    // 마지막의 완료 버튼을 클릭
    // '아무것도 안하기' 확인
    // '더욱 더 아무것도 안하기' 확인
    // '본격적으로 아무것도 안하기' 확인
    // 완료 버튼이 3개임을 확인
  });

  it('delete all tasks', () => {
    // TODO: 모든 tasks를 완료하는 test
    // 모든 완료 버튼을 클릭
    // '할 일이 없어요!' 확인
  });
});
