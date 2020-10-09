import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import App from './App';

/**
 * App : state관리에 대한 테스트를 진행한다.
 */
describe('App', () => {
  const state = {
    newId: 100,
    taskTitle: '',
    tasks: [],
  };

  const { newId, taskTitle, tasks } = state;

  context('When called handleChangeTitle', () => {

  });

  context('When called handleClickAddTask', () => {

  });

  context('When called handleClickDeleteTask', () => {

  });
});
