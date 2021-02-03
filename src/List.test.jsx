import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List에서', () => {
  const onClickDelete = jest.fn();

  function renderListWith(tasks) {
    return render((
      <List
        tasks={tasks}
        onClickDelete={onClickDelete}
      />
    ));
  }

  context('tasks에 할 일이 하나도 없을 때', () => {
    const tasks = [];

    it('할 일이 없다는 것을 보여준다.', () => {
      const { container } = renderListWith(tasks);
      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('tasks에 여러가지 할 일들이 있을 때', () => {
    const tasks = [
      { id: 1, title: '볶음밥 만들기' },
      { id: 2, title: '누워있기' },
      { id: 3, title: '계속 누워있기' },
    ];

    it('그 일들을 모두 보여준다.', () => {
      const { getAllByRole } = renderListWith(tasks);
      getAllByRole('listitem').forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });

    it('완료버튼을 누르면 onClickDelete 함수를 실행한다.', () => {
      const { getAllByText } = renderListWith(tasks);
      getAllByText('완료').forEach((button) => {
        fireEvent.click(button);
        expect(onClickDelete).toBeCalled();
      });
    });
  });
});
