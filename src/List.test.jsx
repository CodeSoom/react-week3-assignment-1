import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  function renderList(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('tasks가 없는 경우', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderList(tasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks가 있는 경우', () => {
    const tasks = [
      {
        id: 1,
        title: '아무것도 하지 않기 #1',
      },
      {
        id: 2,
        title: '아무것도 하지 않기 #2',
      },
    ];

    it('tasks를 보여준다.', () => {
      const { container } = renderList(tasks);

      tasks.forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
    });

    it('"완료" 버튼을 할 일을 삭제한다.', () => {
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');

      buttons.forEach((button) => {
        fireEvent.click(button);
        expect(handleClickDelete).toBeCalledWith(1);
      });
    });
  });
});
