import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  const renderUtil = (tasks = [], taskTitle = '') => render((
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelete}
    />
  ));

  context('when loading complete', () => {
    it('verify visible input', () => {
      const { getByLabelText } = renderUtil();

      expect(getByLabelText('할 일')).toBeVisible();
    });

    it('verify visible input button', () => {
      const { getByText } = renderUtil();

      expect(getByText('추가')).toBeVisible();
    });

    it('verify visible 할 일이 없어요! text', () => {
      const { getByText } = renderUtil();

      expect(getByText('할 일이 없어요!')).toBeVisible();
    });
  });

  context('when exist list over 1 in page', () => {
    const tasks = [
      {
        id: 1,
        title: '할일1',
      },
      {
        id: 2,
        title: '할일2',
      },
    ];

    it('verify visible list', () => {
      const { getByText } = renderUtil(tasks);

      tasks.forEach(({ title }) => {
        expect(getByText(title)).toBeVisible();
      });
    });

    it('verify visible button', () => {
      const { getAllByText } = renderUtil(tasks);

      const buttons = Array.from(expect(getAllByText('완료')));

      buttons.forEach((button) => button.toBeVisible());
    });
  });
});
