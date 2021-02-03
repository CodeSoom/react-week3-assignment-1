import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

/**
 * 테스트 목록
 *
 * list가 아무것도 없을때 "할 일이 없어요!"가 보이는지
 * List가 있을때 task가 화면에 보이는지
 */

describe('List', () => { // 테스트 하려는 대상
  const handleClickDelete = jest.fn();

  const renderList = ({ tasks }) => render(
    <List tasks={tasks} onClickDelete={handleClickDelete} />,
  );

  context('without tasks', () => { // when, with, without을 사용해 상황(맥락) 서술
    it('renders no task message', () => { // 테스트 내용 서술
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('renders tasks', () => {
      const tasks = [
        { id: 1, title: '코딩하기' },
        { id: 2, title: '홈트하기' },
      ];

      const { container, getAllByText } = renderList({ tasks });
      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);

      fireEvent.click(getAllByText('완료')[0]);

      expect(handleClickDelete).toBeCalled();

      fireEvent.click(getAllByText('완료')[1]);

      expect(handleClickDelete).toBeCalledTimes(2);
    });
  });
});
