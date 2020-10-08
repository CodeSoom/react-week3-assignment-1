/*
 * TODO:
 * 1. 할 일이 없을 때 할 일이 없어요! 라는 placeholder 값이 보여야 한다.
 * 2. 할 일을 추가하여 글이 있을 때 할 일 목록에 글이 보여야 한다.
​ */
import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {

  const handleClickDelete = jest.fn();
  const renderHelper = (tasks = []) => render((
    <List
      tasks={tasks}
      onClickDelete={handleClickDelete}
    />
  ));

  context('할 일이 없을 때', () => {
    it('할 일이 없어요! 라는 글을 보여 준다', () => {
      const { container } = renderHelper();

      expect(container).toHaveTextContent('할 일이 없어요!');
      expect(container).not.toHaveTextContent('완료');
    });
  });

  context('할 일이 있을 때', () => {
    it('할 일 목록과 완료 버튼이 보여야 한다', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기',
        },
        {
          id: 2,
          title: '잠이라도 자기',
        },
      ];

      const { container, queryAllByText } = renderHelper(tasks);
      const buttons = queryAllByText('완료');

      expect(container).toHaveTextContent('뭐라도 하기');
      expect(container).toHaveTextContent('잠이라도 자기');
      expect(tasks.length).toBe(buttons.length);
    });

    it('할 일 완료 버튼 클릭시 삭제가 되야 한다', () => {
      const tasks = [
        {
          id: 1,
          title: '뭐라도 하기',
        },
      ];

      const { container, getByText } = renderHelper(tasks);

      expect(container).toHaveTextContent('뭐라도 하기');

      expect(handleClickDelete).not.toBeCalled();

      fireEvent.click(getByText('완료'));

      expect(handleClickDelete).toBeCalledWith(tasks[0].id);
    });
  });
});
