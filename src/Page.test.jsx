import React from 'react';

import { render } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChange = jest.fn();
  const handleClickAdd = jest.fn();
  const handleClickDelete = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  const renderPage = (tasks = [], taskTitle = '') => render((
    <Page
      tasks={tasks}
      taskTitle={taskTitle}
      onChangeTitle={handleChange}
      onClickAddTask={handleClickAdd}
      onClickDeleteTask={handleClickDelete}
    />
  ));

  context('페이지 로딩이 완료되었을 때', () => {
    it('input 이 보이는지 확인', () => {
      const { getByLabelText } = renderPage();

      expect(getByLabelText('할 일')).toBeVisible();
    });

    it('input 옆 추가 버튼이 보이는지 확인', () => {
      const { getByText } = renderPage();

      expect(getByText('추가')).toBeVisible();
    });

    it('할 일이 없어요! 텍스트가 보이는지', () => {
      const { getByText } = renderPage();

      expect(getByText('할 일이 없어요!')).toBeVisible();
    });
  });

  context('리스트가 한개 이상인 페이지 상태일 때', () => {
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

    it('리스트 목록 모두 보이는지 확인', () => {
      const { getByText } = renderPage(tasks);

      tasks.forEach(({ title }) => {
        expect(getByText(title)).toBeVisible();
      });
    });

    it('완료 버튼들이 모두 보이는지 확인', () => {
      const { getAllByText } = renderPage(tasks);

      const buttons = Array.from(expect(getAllByText('완료')));

      buttons.forEach((button) => button.toBeVisible());
    });
  });
});
