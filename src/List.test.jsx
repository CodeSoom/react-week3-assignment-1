import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClickDelete = jest.fn();

  context('할 일이 존재하지 않으면', () => {
    const tasks = [];

    it('"할 일이 없어요!" 메세지만 노출한다.', () => {
      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('할 일이 존재한다면', () => {
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
    ];

    it('할 일 목록이 순서대로 보여진다', () => {
      const { getAllByRole } = render((
        <List tasks={tasks} />
      ));
      const taskTitles = getAllByRole('listitem');

      taskTitles.forEach((listItem, index) => {
        expect(listItem).toHaveTextContent(tasks[index].title);
        expect(listItem).toHaveTextContent('완료');
      });
    });

    it('할 일 목록에 순번이 매겨진다', () => {
      const { container } = render((
        <List tasks={tasks} />
      ));

      expect(container).toContainHTML('ol');
    });
  });

  context('삭제 버튼을 클릭하면', () => {
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
    ];

    it('클릭한 횟수 만큼 handleClickDelete 함수가 실행된다', () => {
      const { getAllByText } = render((
        <List tasks={tasks} onClickDelete={handleClickDelete} />
      ));

      const deleteButtons = getAllByText('완료');

      expect(handleClickDelete).not.toBeCalled();

      deleteButtons.forEach((button) => {
        fireEvent.click(button);
      });

      expect(handleClickDelete).toBeCalledTimes(2);
    });
  });
});
