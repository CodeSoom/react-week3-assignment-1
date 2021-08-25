import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import List from './List';

describe('List 컴포넌트는', () => {
  const handleClickDeleteTask = jest.fn();

  context('task에 값이 없으면', () => {
    const tasks = [];

    it('default text가 표시된다.', () => {
      const defaultText = '할 일이 없어요!'
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));
    
      expect(container).toHaveTextContent(defaultText);
    });
  });

  context('task에 값이 있으면', () => {
    const tasks = [
      {
        id: 1,
        title: '스트릿 우먼 파이터 시청하기'
      },
      {
        id: 2,
        title: '유퀴즈 클립 보기'
      },
      {
        id: 3,
        title: '회 시켜 먹기'
      },
    ];
    
    it('할 일 목록과, 완료 버튼을 보여준다.', () => {
      const { container } = render((
        <List
          tasks={tasks}
        />
      ));

      expect(container).toHaveTextContent('스트릿 우먼 파이터 시청하기');
      expect(container).toHaveTextContent('유퀴즈 클립 보기');
      expect(container).toHaveTextContent('회 시켜 먹기');
      expect(container).toHaveTextContent('완료');
    })

    it('완료 버튼이 잘 호출된다.', () => {
      const { getAllByText } = render((
        <List
          tasks={tasks}
          onClickDelete={handleClickDeleteTask}
        />
      ));

      expect(handleClickDeleteTask).not.toBeCalled();

      getAllByText('완료').forEach((complete) => {
        fireEvent.click(complete);
      });

      expect(handleClickDeleteTask).toBeCalledWith(tasks.length);
    })
  });
});