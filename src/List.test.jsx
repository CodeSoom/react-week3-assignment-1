import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  const renderList = (tasks) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  context('without tasks', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    const tasks = [
      { id: 1, title: '코드숨 과제하기' },
      { id: 2, title: '아무것도 하지 않기' },
    ];

    it('"tasks.title"이 화면에 표시되는지 확인한다.', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });

    it('완료 버튼을 클릭한다.', () => {
      const { getAllByText } = renderList(tasks);
      const buttons = getAllByText('완료');

      expect(handleClickDelete).not.toBeCalled();

      buttons.forEach((button) => fireEvent.click(button));

      expect(handleClickDelete).toBeCalledWith(1);
      expect(handleClickDelete).toBeCalledWith(2);
    });
  });
});
