import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const onClickDelete = jest.fn();

  const renderList = (tasks) => render((
    <List
      tasks={tasks}
      onClickDelete={onClickDelete}
    />
  ));

  context('without tasks', () => {
    it('"할 일이 없어요!" 확인', () => {
      const { getByText } = renderList([]);

      expect(getByText('할 일이 없어요!')).toBeInTheDocument();
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '아무것도 안하기' },
      { id: 2, title: '본격적으로 아무것도 안하기' },
    ];

    it('입력된 task 확인', () => {
      const { getByText } = renderList(tasks);

      tasks.forEach((task) => {
        expect(getByText(task.title)).toBeInTheDocument();
      });
    });

    it('"완료" 버튼 갯수, 클릭시 동작 확인', () => {
      const { getAllByText } = renderList(tasks);
      const buttons = getAllByText('완료');

      expect(buttons).toHaveLength(tasks.length);
      expect(onClickDelete).not.toBeCalled();

      buttons.forEach((button) => fireEvent.click(button));

      expect(onClickDelete).toBeCalledTimes(tasks.length);
    });
  });
});
