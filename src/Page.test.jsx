import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Item from './Item';

/**
 * App : state관리에 대한 테스트를 진행한다.
 */
describe('App', () => {
  // state의 tasks에 데이터를 추가에 대해서 테스트한다.
  context('task를 추가하면', () => {
    it('데이터가 추가된다.');
  });
  // state의 tasks에서 데이터를 삭제 하는것에 대해서 테스트한다.
  context('task를 삭제하면', () => {
    it('데이터가 삭제된다.');
  });
  // state의 taskTitle의 데이터를 변경하는 것에 대해서 테스트한다.
  context('taskTitle을 변경하면', () => {
    it('데이터가 변경된다.', () => {

    });
  });
});
