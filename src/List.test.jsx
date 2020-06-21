import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

const onClickDelete = jest.fn();

function createList(tasks) {
  return render((
    <List tasks={tasks} onClickDelete={onClickDelete} />
  ));
}

describe('List', () => {
  context('task가 있을 때', () => {
    const tasks = [{
      id: 1,
      title: '테스트 도전하기',
    }];

    it('등록된 task 제목을 볼 수 있다.', () => {
      const { container } = createList(tasks);

      expect(container).toHaveTextContent('테스트 도전하기');
    });

    it('완료 버튼을 볼 수 있다.', () => {
      const { container } = createList(tasks);

      expect(container).toHaveTextContent('완료');
    });

    it('완료 버튼을 누를 수 있다.', () => {
      const { getByText } = createList(tasks);
      expect(onClickDelete).not.toBeCalled();

      fireEvent.click(getByText('완료'));
      expect(onClickDelete).toBeCalledWith(1);
    });
  });

  context('task가 없을 때', () => {
    const tasks = [];

    it('빈 목록을 확인할 수 있다.', () => {
      const { container } = createList(tasks);

      expect(container).toHaveTextContent('할 일이 없어요!');
    });

    it('완료 버튼을 볼 수 없다.', () => {
      const { container } = createList(tasks);

      expect(container).not.toHaveTextContent('완료');
    });
  });
});
