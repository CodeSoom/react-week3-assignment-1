import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  function renderList({ tasks, handleClickDelete }) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('task가 없을 경우', () => {
    const tasks = [];

    it('"할 일이 없어요!"를 표시한다.', () => {
      const { container } = renderList({ tasks, handleClickDelete: handleClick });

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
      const { container } = renderList({ tasks, handleClickDelete: handleClick });

      expect(container).toHaveTextContent('뭐라도 하기');
    });

    it('완료버튼을 누를 경우 Todo를 삭제한다.', () => {
      const { getByText } = renderList({ tasks, handleClickDelete: handleClick });

      expect(handleClick).not.toBeCalled();
      fireEvent.click(getByText('완료'));
      expect(handleClick).toBeCalled();
    });
  });
});
