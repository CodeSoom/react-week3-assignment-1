import React from 'react';

import { render } from '@testing-library/react';

import List from './List';

/**
 * 테스트 목록
 *
 * list가 아무것도 없을때 "할 일이 없어요!"가 보이는지
 * List가 있을때 task가 화면에 보이는지
 */

/** 질문 목록
 *  List는 tasks를 Item에 전달하기만 하고 실제로 task를 그리는 것은 Item 컴폰너트가 담당하는데
 *  task에 대한 내용을 List에서도 테스트해줘야 하나요? 아니면 Item에서만 받은 task가 화면에
 *  잘 나오는지 테스트하면 될까요?
 *  => List는 여러개의 tasks가 모두 화면에 보이는지를 테스트하고
 *  => Item은 taks 한개가 화면에 보이는지를 테스트하는 차이인가요????
 *
 *  마찬가지로 handleClickDelete 함수도 실제로 실행시키는 컴포넌트는
 *  Item 컴포넌트인데 List 컴포넌트에서 테스트를
 *  해주는게 맞나요???
 */

const handleClickDelete = jest.fn();

const renderList = ({ tasks }) => render(<List tasks={tasks} onClickDelete={handleClickDelete} />);

describe('List', () => { // 테스트 하려는 대상
  context('without tasks', () => { // when, with, without을 사용해 상황(맥락) 서술
    it('render no task message', () => { // 테스트 내용 서술
      const { container } = renderList({ tasks: [] });

      expect(container).toHaveTextContent('할 일이 없어요!');
    });
  });

  context('with tasks', () => {
    it('render tasks', () => {
      const tasks = [
        { id: 1, title: '코딩하기' },
        { id: 2, title: '홈트하기' },
      ];

      const { container } = renderList({ tasks });
      expect(container).toHaveTextContent(tasks[0].title);
      expect(container).toHaveTextContent(tasks[1].title);
    });
  });
});
