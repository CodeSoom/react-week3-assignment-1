import React from 'react';

// import { render, fireEvent } from '@testing-library/react';

// import Page from './Page';

describe('Page', () => {
  it('empty taskTitle && empty tasks', () => {
    // TODO: taskTitle이 빈칸 && tasks가 비어있는 케이스 test
    // placeholder 확인. '할 일을 입력해 주세요'
    // '할 일이 없어요!' 확인
  });

  it('empty taskTitle && exist tasks', () => {
    // TODO: taskTitle이 빈칸 && tasks가 존재하는 케이스 test
    // placeholder 확인. '할 일을 입력해 주세요'
    // tasks = [{ id: 1, title: '아무것도 안하기' }]
    // '아무것도 안하기' 확인
    // 완료 버튼 클릭시 onClickDeleteTask가 호출되는지 확인
  });

  it('exist taskTitle && empty tasks', () => {
    // TODO: taskTitle이 존재 && tasks가 비어있는 케이스 test
    // input의 value가 입력한 value와 동일한지 확인
    // '할 일이 없어요!' 확인
  });

  it('exist taskTitle && exist tasks', () => {
    // TODO: taskTitle이 존재 && tasks가 존재하는 케이스 test
    // input의 value가 입력한 value와 동일한지 확인
    // tasks = [{ id: 1, title: '아무것도 안하기' }]
    // '아무것도 안하기' 확인
    // 완료 버튼 클릭시 onClickDeleteTask가 호출되는지 확인
  });

  it('change value', () => {
    // TODO: value의 change가 일어나는 케이스 test
    // value에 change 이벤트가 생길 때 onChangeTitle 이벤트가 호출되는지 확인
  });

  it('button', () => {
    // TODO: 추가 button을 클릭하는 test
    // button 클릭 시 onClickAddTask 이벤트가 호출되는지 확인
  });
});
