import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  function renderList({ tasks, handleClick }) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClick}
      />
    ));
  }

  context('task가 없을 경우', () => {
    const tasks = [];
    const handleClick = jest.fn();

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderList(tasks, handleClick);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('task가 있을 경우', () => {
    const tasks = [
      {
        id: 1,
        title: '뭐라도 하기',
      },
    ];

    it('입력된 할 일을 표시한다.', () => {
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('뭐라도 하기');
    });
  });
});
